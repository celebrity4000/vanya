// utils/facebookAuth.ts
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export const facebookLogin = async () => {
  try {
    // Login with Facebook SDK
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw new Error('User cancelled the login process');
    }

    // Get access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }

    // Create a Firebase credential with the token
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  } catch (error) {
    throw error;
  }
};

export const facebookLogout = async () => {
  try {
    await LoginManager.logOut();
  } catch (error) {
    console.error('Facebook logout error:', error);
  }
};
