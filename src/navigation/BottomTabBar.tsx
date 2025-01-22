import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const scaleFactor = width / 375;

interface TabBarProps {
  // You can add any additional props if needed
}

const BottomTabBar: React.FC<TabBarProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    {name: 'Home', icon: 'home'},
    {name: 'Shop', icon: 'shopping'},
    {name: 'Bag', icon: 'shopping-outline'},
    {name: 'Favorites', icon: 'heart-outline'},
    {name: 'Profile', icon: 'account-outline'},
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = route.name === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name as never)}>
            <IconButton
              icon={tab.icon}
              size={24 * scaleFactor}
              iconColor={isActive ? '#0A8D48' : '#9B9B9B'}
              style={styles.icon}
            />
            <Text
              style={[
                styles.tabText,
                {color: isActive ? '#0A8D48' : '#9B9B9B'},
              ]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    paddingBottom: 5,
    paddingTop: 5,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 0,
    padding: 0,
  },
  tabText: {
    fontSize: 12 * scaleFactor,
    marginTop: -8 * scaleFactor,
  },
});

export default BottomTabBar;
