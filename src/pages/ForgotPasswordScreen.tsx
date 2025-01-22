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

type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  const handleSend = () => {
    // Add your send logic here
    console.log('Send password reset for:', email);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {/* Back Arrow Container */}
      <View style={styles.backContainer}>
        <IconButton
          icon="arrow-left"
          size={24}
          iconColor="#000"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot password</Text>

        <Text style={styles.description}>
          Please, enter your email address. You will receive a link to create a
          new password via email.
        </Text>

        <View style={styles.inputContainer}>
          <View
            style={[
              styles.inputWrapper,
              isError && styles.inputError,
              isFocused && styles.inputFocused, // Apply focused style
            ]}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setIsError(false);
              }}
              placeholder="email@example.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setIsFocused(true)} // Set focus to true
              onBlur={() => setIsFocused(false)} // Set focus to false
            />
            {email.length > 0 && (
              <IconButton
                icon="close"
                size={20}
                iconColor="#098E3E"
                style={styles.clearButton}
                onPress={() => setEmail('')}
              />
            )}
          </View>
          {isError && (
            <Text style={styles.errorText}>
              Not a valid email address. Should be your@email.com
            </Text>
          )}
        </View>

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>SEND</Text>
        </TouchableOpacity>
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
    marginBottom: '25%',
    color: 'black',
  },
  description: {
    color: '#000',
    marginBottom: '8%',
    lineHeight: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: '5%',
  },
  inputWrapper: {
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: '4%',
    height: 65,
    justifyContent: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
  inputFocused: {
    borderColor: '#098E3E', // Green border color when focused
  },
  inputLabel: {
    position: 'absolute',
    top: 8,
    left: '4%',
    fontSize: 12,
    color: '#F01F0E',
    marginBottom: 16,
  },
  input: {
    marginTop: 14,
    fontSize: 14,
    color: '#000',
    padding: 0,
  },
  clearButton: {
    position: 'absolute',
    right: 0,
    margin: 0,
    padding: 0,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  sendButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0A8D48',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
