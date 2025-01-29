// ProfileScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {images} from '../assets/images/images';
import BottomTabBar from '../navigation/BottomTabBar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const getCurrentUser = () => {
      const user = auth().currentUser;
      if (user) {
        setUserName(user.displayName || 'User');
        setUserEmail(user.email || '');
        setUserPhoto(user.photoURL);
      } else {
        navigation.replace('SignUp');
      }
      setLoading(false);
    };

    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setUserName(user.displayName || 'User');
        setUserEmail(user.email || '');
        setUserPhoto(user.photoURL);
      } else {
        navigation.replace('SignUp');
      }
      setLoading(false);
    });

    getCurrentUser();
    return unsubscribe;
  }, [navigation]);

  const handleImagePicker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 800, // Increased for better quality
        maxHeight: 800,
        includeBase64: true, // Added this
      });

      if (result.didCancel || !result.assets || !result.assets[0].uri) {
        return;
      }

      await uploadProfileImage(result.assets[0].uri);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const uploadProfileImage = async (imageUri: string) => {
    try {
      setUploadingImage(true);
      const user = auth().currentUser;
      if (!user) return;

      // Convert image to base64
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const reader = new FileReader();
      const base64Promise = new Promise(resolve => {
        reader.onload = () => {
          const base64String = reader.result?.toString().split(',')[1];
          resolve(base64String);
        };
      });
      reader.readAsDataURL(blob);
      const base64Image = await base64Promise;

      // Upload to ImgBB
      const formData = new FormData();
      formData.append('image', base64Image);

      const imgbbResponse = await fetch(
        'https://api.imgbb.com/1/upload?key=3eb9fefc3224238a8ae53d2fb8c8b012', // Replace with your API key
        {
          method: 'POST',
          body: formData,
        },
      );

      const imgbbData = await imgbbResponse.json();

      if (imgbbData.success) {
        // Update user profile with ImgBB URL
        await user.updateProfile({
          photoURL: imgbbData.data.url,
        });

        setUserPhoto(imgbbData.data.url);
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadingImage(false);
    }
  };
  const handleSignOut = async () => {
    try {
      await auth().signOut();
      navigation.replace('SignUp');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0A8D48" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <View style={[styles.container]}>
        <Text style={styles.title}>My profile</Text>

        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={handleImagePicker}
            disabled={uploadingImage}>
            <Image
              source={userPhoto ? {uri: userPhoto} : images.profile}
              style={styles.profileImage}
            />
            {uploadingImage ? (
              <View style={styles.uploadingOverlay}>
                <ActivityIndicator color="#fff" />
              </View>
            ) : (
              <View style={styles.editIconContainer}>
                <IconButton
                  icon="pencil"
                  size={16}
                  iconColor="#fff"
                  style={styles.editIcon}
                />
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.email}>{userEmail}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Orders')}>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>My orders</Text>
            <Text style={styles.menuSubtitle}>Already have 12 orders</Text>
          </View>
          <IconButton icon="chevron-right" size={24} iconColor="#9B9B9B" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Settings')}>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Settings</Text>
            <Text style={styles.menuSubtitle}>Notifications, password</Text>
          </View>
          <IconButton icon="chevron-right" size={24} iconColor="#9B9B9B" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.signOutItem]}
          onPress={handleSignOut}>
          <View style={styles.menuContent}>
            <Text style={[styles.menuTitle, styles.signOutText]}>Sign Out</Text>
          </View>
          <IconButton icon="logout" size={24} iconColor="#FF3B30" />
        </TouchableOpacity>
      </View>
      <BottomTabBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    marginTop: 40,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '10%',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#0A8D48',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    margin: 0,
    padding: 0,
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#000',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  menuSubtitle: {
    fontSize: 11,
    color: '#000',
  },
  signOutItem: {
    marginTop: 'auto',
    borderBottomWidth: 0,
  },
  signOutText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
});

export default ProfileScreen;
