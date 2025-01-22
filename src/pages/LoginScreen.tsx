import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IconButton} from 'react-native-paper';

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log({email, password});
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log('Social login with:', provider);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {/* Back Arrow Container */}
      <View style={styles.backContainer}>
        <IconButton
          icon="arrow-left"
          iconColor="#000"
          size={24}
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Main Content Container */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="muffin.sweet@gmail.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {email.length > 0 && <Text style={styles.checkmark}>✓</Text>}
          </View>
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
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPassword}>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>
                Forgot your password?
              </Text>
              <IconButton
                icon="arrow-right"
                size={16}
                iconColor="#000"
                style={styles.forgotPasswordIcon}
              />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <Text style={styles.socialText}>Or login with social account</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('google')}>
              <IconButton icon="google" size={24} iconColor="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('facebook')}>
              <IconButton icon="facebook" size={24} iconColor="#4267B2" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backContainer: {
    paddingTop: '2%',
    paddingHorizontal: '2%',
  },
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: '4%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '8%',
    color: 'black',
  },
  inputContainer: {
    marginBottom: '5%',
    width: '100%',
  },
  inputWrapper: {
    position: 'relative',
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
  checkmark: {
    position: 'absolute',
    right: '4%',
    top: '30%',
    color: '#0A8D48',
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: '2%',
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: 'black',
  },
  forgotPasswordIcon: {
    margin: 0,
    padding: 0,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0A8D48',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '8%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: "auto",
  },
  socialText: {
    color: '#000',
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

export default LoginScreen;
