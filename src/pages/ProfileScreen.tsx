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
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {images} from '../assets/images/images';
import BottomTabBar from '../navigation/BottomTabBar';
import CustomStatusBar from '../components/CustomStatusBar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import auth from '@react-native-firebase/auth';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user data
    const getCurrentUser = () => {
      const user = auth().currentUser;
      if (user) {
        // Get displayName (set during signup) and email
        setUserName(user.displayName || 'User');
        setUserEmail(user.email || '');
      } else {
        // If no user is signed in, redirect to login
        navigation.replace('SignUp');
      }
      setLoading(false);
    };

    // Set up auth state listener
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setUserName(user.displayName || 'User');
        setUserEmail(user.email || '');
      } else {
        navigation.replace('SignUp');
      }
      setLoading(false);
    });

    getCurrentUser();

    // Cleanup subscription
    return unsubscribe;
  }, [navigation]);

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
          <Image source={images.profile} style={styles.profileImage} />
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
  containerMargin: {
    marginTop: StatusBar.currentHeight || 0,
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
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
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
