import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {toggleFavorite} from '../redux/favoritesSlice';
import {RootStackParamList} from '../../App';
import CustomStatusBar from '../components/CustomStatusBar';
import {addToBag} from '../redux/bagSlice';

type RouteProps = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetail: React.FC = () => {
  const [quantity, setQuantity] = useState('1');
  const [showQuantity, setShowQuantity] = useState(false);
  const quantities = [1, 2, 3, 4, 5];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute<RouteProps>();
  const productId = route.params.productId;

  const product = useSelector((state: RootState) =>
    state.products.items.find(item => item.id === productId),
  );
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some(fav => fav.id === productId);

  const calculateTotalPrice = () => {
    if (!product) return '₹0';
    const basePrice = parseInt(product.price.replace('₹', ''));
    const total = basePrice * parseInt(quantity);
    return `₹${total}`;
  };

  const formatPrice = (price: string) => {
    return parseInt(price.replace('₹', ''));
  };

  const renderRatingStars = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <IconButton
            key={star}
            icon={star <= rating ? 'star' : 'star-outline'}
            size={14}
            iconColor={star <= rating ? '#FFBA49' : '#DAD9E2'}
            style={styles.starIcon}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={'#fff'} barStyle="dark-content" />
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>{product?.name}</Text>
        <IconButton icon="share-variant" size={24} onPress={() => {}} />
      </View>

      <ScrollView>
        <Image
          source={product?.image}
          style={styles.productImage}
          resizeMode="contain"
        />

        <View style={styles.detailsContainer}>
          <View style={styles.brandRow}>
            <Text style={styles.brandName}>{product?.name}</Text>
            <TouchableOpacity
              onPress={() => product && dispatch(toggleFavorite(product))}>
              <IconButton
                icon={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                iconColor={isFavorite ? '#DB3022' : '#9B9B9B'}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.productName}>{product?.name}</Text>

          <View style={styles.ratingRow}>
            {renderRatingStars(product?.rating || 0)}
            <Text style={styles.reviewCount}>({product?.reviews} reviews)</Text>
          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.label}>Quantity</Text>
            <TouchableOpacity
              style={styles.quantitySelector}
              onPress={() => setShowQuantity(!showQuantity)}>
              <Text style={styles.quantityText}>{quantity}</Text>
              <IconButton icon="chevron-down" size={20} iconColor="#000" />
            </TouchableOpacity>

            {showQuantity && (
              <View style={styles.quantityDropdown}>
                {quantities.map(num => (
                  <TouchableOpacity
                    key={num}
                    style={styles.quantityOption}
                    onPress={() => {
                      setQuantity(num.toString());
                      setShowQuantity(false);
                    }}>
                    <Text style={styles.quantityText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Item details</Text>
            <Text style={styles.description}>{product?.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping info</Text>
            <Text style={styles.description}>
              Standard delivery 4-6 business days
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <Text style={styles.description}>
              Contact us for any queries or support
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.price}>{calculateTotalPrice()}</Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            if (product) {
              dispatch(addToBag({product, quantity: parseInt(quantity)}));
              navigation.navigate('Bag' as never);
            }
          }}>
          <Text style={styles.addToCartText}>ADD TO CART</Text>
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
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  productImage: {
    width: '100%',
    height: 400,
    backgroundColor: '#F2F2F2',
  },
  detailsContainer: {
    padding: 16,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222222',
  },
  productName: {
    fontSize: 16,
    marginVertical: 8,
    color: '#9B9B9B',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    margin: 0,
    padding: 0,
  },
  reviewCount: {
    marginLeft: 8,
    color: '#9B9B9B',
  },
  quantityContainer: {
    marginBottom: 24,
    position: 'relative',
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
    color: '#222222',
    fontWeight: '500',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
  },
  quantityText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  quantityDropdown: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 8,
    zIndex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  quantityOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#000',
  },
  description: {
    color: '#666666',
    lineHeight: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    backgroundColor: '#fff',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#0A8D48',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ProductDetail;
