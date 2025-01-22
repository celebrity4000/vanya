// src/components/CustomStatusBar.tsx
import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';

interface CustomStatusBarProps {
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
}

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  backgroundColor = 'transparent',
  barStyle = 'dark-content',
}) => {
  return (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default CustomStatusBar;
