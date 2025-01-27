// components/SocialMediaButtons.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';

interface SocialMediaButtonsProps {
  onSocialPress: (provider: 'google' | 'facebook') => void;
  containerText: string;
}

const SocialMediaButtons: React.FC<SocialMediaButtonsProps> = ({
  onSocialPress,
  containerText,
}) => {
  return (
    <View style={styles.socialContainer}>
      <Text style={styles.socialText}>{containerText}</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => onSocialPress('google')}>
          <IconButton icon="google" size={24} iconColor="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => onSocialPress('facebook')}>
          <IconButton icon="facebook" size={24} iconColor="#4267B2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  socialContainer: {
    // Remove absolute positioning
    marginTop: 20,
    alignItems: 'center',
  },
  socialText: {
    color: '#666',
    marginBottom: '4%',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  socialButton: {
    width: '15%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '4%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default SocialMediaButtons;
