// OrdersScreen.tsx
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
import {IconButton} from 'react-native-paper';
import CustomStatusBar from '../components/CustomStatusBar';
import {useNavigation} from '@react-navigation/native';

type OrderStatus =
  | 'Delivered'
  | 'Processing'
  | 'Out for delivery'
  | 'Shipped'
  | 'Cancelled';

interface OrderCardProps {
  orderNumber: string;
  trackingNumber: string;
  quantity: number;
  totalAmount: string;
  date: string;
  status: OrderStatus;
  cancelReason?: string;
}

type TabType = 'Delivered' | 'Processing' | 'Cancelled';

const statusStyles = {
  delivered: {color: '#0A8D48'},
  processing: {color: '#F1C40F'},
  'out for delivery': {color: '#F1C40F'},
  shipped: {color: '#F1C40F'},
  cancelled: {color: '#FF4B4B'},
};

const OrderCard = ({
  orderNumber,
  trackingNumber,
  quantity,
  totalAmount,
  date,
  status,
  cancelReason,
}: OrderCardProps) => (
  <View style={styles.orderCard}>
    <View style={styles.orderHeader}>
      <Text style={styles.orderNumber}>Order №{orderNumber}</Text>
      <Text style={styles.orderDate}>{date}</Text>
    </View>

    <View style={styles.orderDetails}>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Tracking number:</Text>
        <Text style={styles.detailValue}>{trackingNumber}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Quantity:</Text>
        <Text style={styles.detailValue}>{quantity}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Total Amount:</Text>
        <Text style={styles.detailValue}>{totalAmount}</Text>
      </View>

      {cancelReason && (
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Cancel Reason:</Text>
          <Text style={[styles.detailValue, styles.cancelText]}>
            {cancelReason}
          </Text>
        </View>
      )}
    </View>

    <Text
      style={[
        styles.status,
        statusStyles[status.toLowerCase() as keyof typeof statusStyles],
      ]}>
      {status}
    </Text>
  </View>
);

const ordersData = {
  Delivered: [
    {
      id: '1',
      orderNumber: '1947034',
      trackingNumber: 'IW3475453455',
      quantity: 3,
      totalAmount: '112$',
      date: '05-12-2019',
      status: 'Delivered' as OrderStatus,
    },
    {
      id: '2',
      orderNumber: '1947035',
      trackingNumber: 'IW3475453456',
      quantity: 2,
      totalAmount: '90$',
      date: '06-12-2019',
      status: 'Delivered' as OrderStatus,
    },
  ],
  Processing: [
    {
      id: '3',
      orderNumber: '1947036',
      trackingNumber: 'IW3475453457',
      quantity: 1,
      totalAmount: '75$',
      date: '07-12-2019',
      status: 'Out for delivery' as OrderStatus,
    },
    {
      id: '4',
      orderNumber: '1947037',
      trackingNumber: 'IW3475453458',
      quantity: 4,
      totalAmount: '150$',
      date: '07-12-2019',
      status: 'Shipped' as OrderStatus,
    },
    {
      id: '5',
      orderNumber: '1947038',
      trackingNumber: 'IW3475453459',
      quantity: 2,
      totalAmount: '95$',
      date: '07-12-2019',
      status: 'Processing' as OrderStatus,
    },
  ],
  Cancelled: [
    {
      id: '6',
      orderNumber: '1947039',
      trackingNumber: 'IW3475453460',
      quantity: 2,
      totalAmount: '95$',
      date: '08-12-2019',
      status: 'Cancelled' as OrderStatus,
      cancelReason: 'Wrong size ordered',
    },
    {
      id: '7',
      orderNumber: '1947040',
      trackingNumber: 'IW3475453461',
      quantity: 1,
      totalAmount: '45$',
      date: '08-12-2019',
      status: 'Cancelled' as OrderStatus,
      cancelReason: 'Out of stock',
    },
  ],
};

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('Delivered');

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
          <Text style={styles.title}>My Orders</Text>
        </View>

        <View style={styles.tabContainer}>
          {(['Delivered', 'Processing', 'Cancelled'] as TabType[]).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.ordersContainer}>
          {ordersData[activeTab].map(order => (
            <OrderCard key={order.id} {...order} />
          ))}
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
    backgroundColor: '#f8f8f8',
  },
  containerMargin: {
    marginTop: StatusBar.currentHeight || 0,
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
  header: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  tab: {
    marginRight: 45,
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  tabText: {
    color: '#9B9B9B',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
  },
  ordersContainer: {
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  orderDate: {
    color: '#9B9B9B',
  },
  orderDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#9B9B9B',
  },
  detailValue: {
    color: '#000',
  },
  status: {
    alignSelf: 'flex-end',
    fontSize: 14,
  },
  cancelText: {
    color: '#FF4B4B',
    maxWidth: '60%',
    textAlign: 'right',
  },
});

export default OrdersScreen;
