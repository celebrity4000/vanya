// components/CustomAlert.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {IconButton} from 'react-native-paper';

export interface AlertButton {
  text: string;
  type: 'default' | 'cancel' | 'action';
  onPress: () => void | Promise<void>;
}

export interface AlertConfig {
  visible: boolean;
  title: string;
  message: string;
  buttons: AlertButton[];
  loading?: boolean;
}

interface CustomAlertProps extends AlertConfig {}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  buttons = [],
  loading = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <View style={styles.titleContainer}>
            {title === 'Success' && (
              <IconButton
                icon="check-circle"
                size={32}
                iconColor="#0A8D48"
                style={styles.icon}
              />
            )}
            {title === 'Error' && (
              <IconButton
                icon="alert-circle"
                size={32}
                iconColor="#FF3B30"
                style={styles.icon}
              />
            )}
            <Text style={styles.title}>{title}</Text>
          </View>

          <Text style={styles.message}>{message}</Text>

          {loading && (
            <ActivityIndicator color="#0A8D48" style={styles.loading} />
          )}

          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.type === 'action' && styles.actionButton,
                  button.type === 'cancel' && styles.cancelButton,
                  index < buttons.length - 1 && styles.buttonMargin,
                ]}
                onPress={button.onPress}>
                <Text
                  style={[
                    styles.buttonText,
                    button.type === 'action' && styles.actionButtonText,
                    button.type === 'cancel' && styles.cancelButtonText,
                  ]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: Dimensions.get('window').width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    margin: 0,
    padding: 0,
    marginRight: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  loading: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    flex: 1,
    height: 45,
    backgroundColor: '#F0F0F0',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#0A8D48',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  buttonMargin: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  actionButtonText: {
    color: '#fff',
  },
  cancelButtonText: {
    color: '#fff',
  },
});

export default CustomAlert;
