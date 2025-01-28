// src/pages/CheckoutScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  ScrollView,
  StatusBar,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {MOBILE_NUMBER} from '../constants/personal';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const bagItems = useSelector((state: RootState) => state.bag.items);

  const calculateSubtotal = () => {
    return bagItems.reduce((total: number, item: any) => {
      const price = parseInt(item.price.replace('₹', ''));
      return total + price * item.quantity;
    }, 0);
  };

  const deliveryFee = 15;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  const orderViaWhatsApp = () => {
    const message = `New Order:\n\nDelivery Address:\nJane Doe\n3 Newbridge Court\nChino Hills, CA 91709\n\nItems:\n${bagItems
      .map(
        item =>
          `${item.name} x${item.quantity} - ₹${
            parseInt(item.price) * item.quantity
          }`,
      )
      .join(
        '\n',
      )}\n\nSubtotal: ₹${subtotal}\nDelivery: ₹${deliveryFee}\nTotal: ₹${total}`;

    Linking.openURL(
      `whatsapp://send?phone=${MOBILE_NUMBER}&text=${encodeURIComponent(
        message,
      )}`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.addressSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipping address</Text>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressCard}>
            <Text style={styles.name}>Jane Doe</Text>
            <Text style={styles.address}>3 Newbridge Court</Text>
            <Text style={styles.address}>
              Chino Hills, CA 91709, United States
            </Text>
          </View>
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Order:</Text>
            <Text style={styles.summaryText}>₹{subtotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Delivery:</Text>
            <Text style={styles.summaryText}>₹{deliveryFee}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalText}>Summary:</Text>
            <Text style={styles.totalText}>₹{total}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, styles.whatsappButton]}
          onPress={orderViaWhatsApp}>
          <Text style={styles.buttonText}>Order via WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.submitButton, styles.onlineButton]}>
          <Text style={styles.buttonText}>Pay Online</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.submitButton, styles.codButton]}>
          <Text style={styles.buttonText}>Cash on Delivery</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  addressSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  changeText: {
    color: '#DB3022',
    fontSize: 14,
    fontWeight: '500',
  },
  addressCard: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  summarySection: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#666666',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginTop: 8,
    paddingTop: 16,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  submitButton: {
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  onlineButton: {
    backgroundColor: '#0A8D48',
  },
  codButton: {
    backgroundColor: '#DB3022',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckoutScreen;
