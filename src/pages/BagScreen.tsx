// src/pages/BagScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromBag, updateQuantity} from '../redux/bagSlice';
import {RootState} from '../redux/store';
import {RootStackParamList} from '../../App';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BagScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const bagItems = useSelector((state: RootState) => state.bag.items);

  const calculateTotal = () => {
    return bagItems.reduce((total, item) => {
      const price = parseInt(item.price.replace('₹', ''));
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Bag</Text>
      </View>

      <ScrollView style={styles.itemList}>
        {bagItems.map(item => (
          <View key={item.id} style={styles.bagItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                ₹{parseInt(item.price) * item.quantity}
              </Text>
              <View style={styles.quantityControls}>
                <IconButton
                  icon="minus"
                  size={20}
                  onPress={() => {
                    if (item.quantity > 1) {
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        }),
                      );
                    }
                  }}
                />
                <Text>{item.quantity}</Text>
                <IconButton
                  icon="plus"
                  size={20}
                  onPress={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      }),
                    )
                  }
                />
              </View>
            </View>
            <IconButton
              icon="delete"
              size={24}
              onPress={() => dispatch(removeFromBag(item.id))}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>₹{calculateTotal()}</Text>
        </View>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.proceedButtonText}>PROCEED TO PAY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  headerTitle: {
    fontSize: 20,
    paddingTop: StatusBar.currentHeight || 0,
    fontWeight: 'bold',
    color: '#000',
  },
  itemList: {
    flex: 1,
  },
  bagItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#000',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  proceedButton: {
    backgroundColor: '#0A8D48',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BagScreen;
