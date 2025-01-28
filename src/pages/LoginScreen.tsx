// screens/LoginScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IconButton} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import CustomAlert, {AlertConfig} from '../components/CustomAlert';
import SocialMediaButtons from '../components/SocialMediaButtons';
import {facebookLogin} from '../api/facebookAuth';

// Initialize Google Sign In
GoogleSignin.configure({
  webClientId:
    '833255343418-l7muk36a143iqi1vv2aoctn32md45v05.apps.googleusercontent.com',
  offlineAccess: false,
});

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    visible: false,
    title: '',
    message: '',
    buttons: [],
    loading: false,
  });

  const handleLogin = async () => {
    if (!email || !password) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Please fill in all fields',
        buttons: [
          {
            text: 'OK',
            type: 'default',
            onPress: () => setAlertConfig(prev => ({...prev, visible: false})),
          },
        ],
      });
      return;
    }

    try {
      setLoading(true);
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      if (!userCredential.user.emailVerified) {
        setAlertConfig({
          visible: true,
          title: 'Email Not Verified',
          message: 'Please verify your email before logging in.',
          buttons: [
            {
              text: 'Resend Email',
              type: 'action',
              onPress: async () => {
                setAlertConfig(prev => ({...prev, loading: true}));
                await userCredential.user.sendEmailVerification();
                setAlertConfig({
                  visible: true,
                  title: 'Success',
                  message:
                    'Verification email has been resent to your email address.',
                  buttons: [
                    {
                      text: 'OK',
                      type: 'default',
                      onPress: () =>
                        setAlertConfig(prev => ({...prev, visible: false})),
                    },
                  ],
                });
              },
            },
            {
              text: 'Cancel',
              type: 'cancel',
              onPress: () =>
                setAlertConfig(prev => ({...prev, visible: false})),
            },
          ],
        });
        await auth().signOut();
        return;
      }

      navigation.replace('Home');
    } catch (error: any) {
      let errorMessage = 'An error occurred during login';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Invalid password';
          break;
        default:
          errorMessage = error.message;
      }

      setAlertConfig({
        visible: true,
        title: 'Error',
        message: errorMessage,
        buttons: [
          {
            text: 'OK',
            type: 'default',
            onPress: () => setAlertConfig(prev => ({...prev, visible: false})),
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices();

      // Sign in and get id token
      await GoogleSignin.signIn();

      // Get tokens
      const {accessToken} = await GoogleSignin.getTokens();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        null,
        accessToken,
      );

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);

      navigation.replace('Home');
    } catch (error: any) {
      console.log('Google Sign-In Error:', error);
      let errorMessage = 'An error occurred during Google sign in';

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        errorMessage = 'Sign in is already in progress';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        errorMessage = 'Play services not available or outdated';
      } else {
        errorMessage = error.message;
      }

      setAlertConfig({
        visible: true,
        title: 'Error',
        message: errorMessage,
        buttons: [
          {
            text: 'OK',
            type: 'default',
            onPress: () => setAlertConfig(prev => ({...prev, visible: false})),
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      setLoading(true);

      if (provider === 'google') {
        await handleGoogleLogin();
      } else if (provider === 'facebook') {
        const userCredential = await facebookLogin();
        navigation.replace('Home');
      }
    } catch (error: any) {
      console.log('Social Login Error:', error);
      let errorMessage = 'An error occurred during social login';

      if (error.message === 'User cancelled the login process') {
        return;
      }

      setAlertConfig({
        visible: true,
        title: 'Error',
        message: errorMessage,
        buttons: [
          {
            text: 'OK',
            type: 'default',
            onPress: () => setAlertConfig(prev => ({...prev, visible: false})),
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.backContainer}>
        <IconButton
          icon="arrow-left"
          iconColor="#000"
          size={24}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
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
            returnKeyType="done"
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

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>LOGIN</Text>
          )}
        </TouchableOpacity>

        <SocialMediaButtons
          onSocialPress={handleSocialLogin}
          containerText="Or login with social account"
        />
      </View>

      <CustomAlert {...alertConfig} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backContainer: {
    paddingTop: StatusBar.currentHeight || 0,
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
    color: '#000',
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
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
