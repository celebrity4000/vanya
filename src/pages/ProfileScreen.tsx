// ProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {images} from '../assets/images/images';
import BottomTabBar from '../navigation/BottomTabBar';
import CustomStatusBar from '../components/CustomStatusBar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomStatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={[styles.container, styles.containerMargin]}>
        <Text style={styles.title}>My profile</Text>

        <View style={styles.profileSection}>
          <Image source={images.profile} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Matilda Brown</Text>
            <Text style={styles.email}>matildabrown@mail.com</Text>
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
});

export default ProfileScreen;
