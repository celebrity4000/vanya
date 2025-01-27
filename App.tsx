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
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import SignUpScreen from './src/pages/SignUpScreen';
import LoginScreen from './src/pages/LoginScreen';
import ForgotPasswordScreen from './src/pages/ForgotPasswordScreen';
import HomeScreen from './src/pages/HomeScreen';
import FavoritesScreen from './src/pages/FavoritesScreen';
import Product from './src/pages/Products';
import BagScreen from './src/pages/BagScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import ProductDetail from './src/pages/ProductDetail';
import OrdersScreen from './src/pages/OrdersScreen';
import SettingsScreen from './src/pages/SettingsScreen';
import CheckoutScreen from './src/pages/CheckoutScreen';

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  Shop: undefined;
  Favorites: undefined;
  Bag: undefined;
  Profile: undefined;
  ProductDetail: {productId: string};
  Orders: undefined;
  Settings: undefined;
  Checkout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Shop" component={Product} />
          <Stack.Screen name="Bag" component={BagScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
