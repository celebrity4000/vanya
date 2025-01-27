// SettingsScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {IconButton, Switch} from 'react-native-paper';
import CustomStatusBar from '../components/CustomStatusBar';
import {useNavigation} from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationSettings, setNotificationSettings] = useState({
    sales: true,
    newArrivals: false,
    deliveryStatus: false,
  });
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomStatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={[styles.container, styles.containerMargin]}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            size={24}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Settings</Text>
        </View>

        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Full name</Text>
              <View style={styles.inputField}>
                <Text style={styles.inputValue}>Matilda Brown</Text>
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Date of Birth</Text>
              <View style={styles.inputField}>
                <Text style={styles.inputValue}>12/12/1989</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.passwordHeader}>
              <Text style={styles.sectionTitle}>Password</Text>
              <TouchableOpacity>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputField}>
                <Text style={styles.inputValue}>************</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.notificationContainer}>
              <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>Sales</Text>
                <Switch
                  value={notificationSettings.sales}
                  onValueChange={value =>
                    setNotificationSettings({
                      ...notificationSettings,
                      sales: value,
                    })
                  }
                  color="#0A8D48"
                />
              </View>
              <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>New arrivals</Text>
                <Switch
                  value={notificationSettings.newArrivals}
                  onValueChange={value =>
                    setNotificationSettings({
                      ...notificationSettings,
                      newArrivals: value,
                    })
                  }
                  color="#0A8D48"
                />
              </View>
              <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>
                  Delivery status changes
                </Text>
                <Switch
                  value={notificationSettings.deliveryStatus}
                  onValueChange={value =>
                    setNotificationSettings({
                      ...notificationSettings,
                      deliveryStatus: value,
                    })
                  }
                  color="#0A8D48"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
  },
  containerMargin: {
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  backButton: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 20,
    marginTop: 0,
    marginBottom: 20,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 16,
    fontWeight: '500',
  },
  inputWrapper: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 11,
    color: '#9B9B9B',
    marginBottom: 4,
    position: 'absolute',
    top: 8,
    left: 16,
    zIndex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  },
  inputField: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    height: 64,
    justifyContent: 'center',
  },
  inputValue: {
    fontSize: 14,
    color: '#000',
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  changeText: {
    color: '#0A8D48',
    fontSize: 14,
  },
  notificationContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  notificationText: {
    fontSize: 14,
    color: '#000',
  },
});

export default SettingsScreen;
