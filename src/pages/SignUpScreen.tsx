// SignUpScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IconButton} from 'react-native-paper';
import SocialMediaButtons from '../components/SocialMediaButtons';

// Define the navigation param list type
export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log({name, email, password});
  };

  const handleSocialSignUp = (provider: 'google' | 'facebook') => {
    // Handle social sign up logic here
    console.log('Social sign up with:', provider);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign up</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter Your Name"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Your Email Address"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.loginLink}>
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <IconButton
              icon="arrow-right"
              size={16}
              iconColor="#666"
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>

        <SocialMediaButtons
          onSocialPress={handleSocialSignUp}
          containerText="Or sign up with social account"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    paddingTop: '20%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '8%',
    color: '#000',
  },
  inputContainer: {
    marginBottom: '5%',
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: '2%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingHorizontal: '4%',
    backgroundColor: '#F8F8F8',
  },
  loginLink: {
    alignSelf: 'flex-end',
    marginBottom: '5%',
  },
  loginText: {
    color: '#000',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    margin: 0,
    padding: 0,
    color: '#000',
  },
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0A8D48',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8%',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialContainer: {
    alignItems: 'center',
    marginTop: '5%',
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
  socialIcon: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
});

export default SignUpScreen;
