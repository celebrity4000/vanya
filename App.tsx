/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// App.tsx
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SignUpScreen from './src/pages/SignUpScreen';
import LoginScreen from './src/pages/LoginScreen';
import ForgotPasswordScreen from './src/pages/ForgotPasswordScreen';
import HomeScreen from './src/pages/HomeScreen';
import FavoritesScreen from './src/pages/FavoritesScreen';
import Product from './src/pages/Products';
import BagScreen from './src/pages/BagScreen';
import ProfileScreen from './src/pages/ProfileScreen';

// Update RootStackParamList to include Home
export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  Shop: undefined;
  Favorites: undefined;
  Bag: undefined;
  Profile: undefined;
  // MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Shop" component={Product} />
        <Stack.Screen name="Bag" component={BagScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        {/* <Stack.Screen name="MainTabs" component={TabNavigator} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
