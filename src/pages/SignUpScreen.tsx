// screens/SignUpScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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

// Initialize Google Sign In with proper configuration
GoogleSignin.configure({
  webClientId:
    '833255343418-l7muk36a143iqi1vv2aoctn32md45v05.apps.googleusercontent.com',
  offlineAccess: true,
});

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FormErrors {
  name: string;
  email: string;
  password: string;
}

interface GoogleUser {
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  };
}

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: '',
    email: '',
    password: '',
  });

  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    visible: false,
    title: '',
    message: '',
    buttons: [],
    loading: false,
  });

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {
      name: '',
      email: '',
      password: '',
    };

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await userCredential.user.updateProfile({
        displayName: name,
      });

      await userCredential.user.sendEmailVerification();

      setAlertConfig({
        visible: true,
        title: 'Success',
        message: 'Please check your email for verification link',
        buttons: [
          {
            text: 'OK',
            type: 'action',
            onPress: () => {
              setAlertConfig(prev => ({...prev, visible: false}));
              navigation.navigate('Login');
            },
          },
        ],
      });
    } catch (error: any) {
      console.log('Firebase error:', error);
      let errorMessage = 'An error occurred during sign up';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
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

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);

      // 1. Check Play Services
      await GoogleSignin.hasPlayServices();

      // 2. Sign in with Google (this opens Google sign-in popup)
      const signInResult = await GoogleSignin.signIn();

      // 3. Get ID token
      const {idToken} = await GoogleSignin.getTokens();

      // 4. Create Firebase credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // 5. Sign in to Firebase
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      // 6. Update profile if new user
      if (
        userCredential.additionalUserInfo?.isNewUser &&
        userCredential.user.email
      ) {
        const username = userCredential.user.email.split('@')[0];
        await userCredential.user.updateProfile({
          displayName: username || 'User',
        });
      }

      navigation.replace('Home');
    } catch (error: any) {
      console.log('Google Sign-Up Error:', error);
      let errorMessage = 'An error occurred during Google sign up';

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
  const handleSocialSignUp = async (provider: 'google' | 'facebook') => {
    try {
      setLoading(true);

      if (provider === 'google') {
        await handleGoogleSignUp();
      } else if (provider === 'facebook') {
        const userCredential = await facebookLogin();

        // If this is a new user, update their profile
        if (userCredential.additionalUserInfo?.isNewUser) {
          await userCredential.user.updateProfile({
            displayName:
              userCredential.user.displayName ||
              userCredential.user.email?.split('@')[0] ||
              'User',
            photoURL: userCredential.user.photoURL || undefined,
          });
        }

        navigation.replace('Home');
      }
    } catch (error: any) {
      console.log('Social Sign-Up Error:', error);
      let errorMessage = 'An error occurred during social sign up';

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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign up</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[styles.input, formErrors.name && styles.inputError]}
              value={name}
              onChangeText={setName}
              placeholder="Enter Your Name"
              placeholderTextColor="#666"
              returnKeyType="next"
            />
            {formErrors.name ? (
              <Text style={styles.errorText}>{formErrors.name}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, formErrors.email && styles.inputError]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Your Email Address"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            {formErrors.email ? (
              <Text style={styles.errorText}>{formErrors.email}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, formErrors.password && styles.inputError]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor="#666"
              returnKeyType="done"
            />
            {formErrors.password ? (
              <Text style={styles.errorText}>{formErrors.password}</Text>
            ) : null}
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

          <TouchableOpacity
            style={[
              styles.signUpButton,
              loading && styles.signUpButtonDisabled,
            ]}
            onPress={handleSignUp}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signUpButtonText}>SIGN UP</Text>
            )}
          </TouchableOpacity>

          <SocialMediaButtons
            onSocialPress={handleSocialSignUp}
            containerText="Or sign up with social account"
          />
        </View>
      </ScrollView>

      <CustomAlert {...alertConfig} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: '20%',
    paddingBottom: 40,
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
    color: '#000',
  },
  inputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 5,
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
  signUpButtonDisabled: {
    opacity: 0.7,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
