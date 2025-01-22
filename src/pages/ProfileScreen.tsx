import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomTabBar from '../navigation/BottomTabBar';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <BottomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
