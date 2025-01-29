import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import {images} from '../assets/images/images';
import BottomTabBar from '../navigation/BottomTabBar';
import {RootState} from '../redux/store';
import {toggleFavorite} from '../redux/favoritesSlice';

interface ProductItem {
  id: string;
  name: string;
  price: string;
  image: any;
  rating: number;
  reviews: number;
  isNew: boolean;
  description?: string;
}

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  HomeScreen: undefined;
  Home: undefined;
  Shop: undefined;
  Favorites: undefined;
  Bag: undefined;
  Profile: undefined;
  ProductDetail: {productId: string};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const windowHeight = Dimensions.get('window').height;

  const saleProducts: ProductItem[] = [
    {
      id: 'sale_1',
      name: 'Bhikhaneri Keshri Pheni',
      price: '30',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
    {
      id: 'sale_2',
      name: 'Pure Patali Gud',
      price: '30',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
    {
      id: 'sale_3',
      name: 'Desi Ghee',
      price: '40',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
  ];

  const newProducts: ProductItem[] = [
    {
      id: 'new_1',
      name: 'Kodo Millets',
      price: '30',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
    {
      id: 'new_2',
      name: 'Foxtail Millets',
      price: '30',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
    {
      id: 'new_3',
      name: 'Little Millet',
      price: '40',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
    {
      id: 'new_4',
      name: 'Barnyard Millet',
      price: '40',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
    {
      id: 'new_5',
      name: 'Brownstop Millet',
      price: '40',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
  ];

  const renderRatingStars = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <IconButton
            key={star}
            icon="star-outline"
            size={14}
            iconColor="#DAD9E2"
            style={styles.starIcon}
          />
        ))}
      </View>
    );
  };

  const renderProductCard = ({item}: {item: ProductItem}) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetail', {productId: item.id})
        }>
        <View style={styles.cardWrapper}>
          <View style={styles.productCard}>
            <Image
              source={item.image}
              style={styles.productImage}
              resizeMode="cover"
            />
            {item.isNew && (
              <View style={styles.newBadge}>
                <Text style={styles.newText}>NEW</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={e => {
                e.stopPropagation(); // Prevent parent onPress from firing
                dispatch(toggleFavorite(item));
              }}>
              <IconButton
                icon="heart"
                size={20}
                iconColor={isFavorite ? '#DB3022' : '#9B9B9B'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.productInfo}>
            <View style={styles.ratingRow}>
              {renderRatingStars(item.rating)}
              <Text style={styles.reviewCount}>({item.reviews})</Text>
            </View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>₹{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="#0A8D48"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.banner, {height: windowHeight * 0.8}]}>
            <Image
              source={images.banner}
              style={styles.bannerImage}
              resizeMode="contain"
            />
            <Text style={styles.bannerTitle}>5 in 1 Millets</Text>
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.checkButtonText}>Check</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>New</Text>
                  <Text style={styles.sectionSubtitle}>
                    You've never seen it before!
                  </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
                  <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                key="newList"
                data={newProducts}
                renderItem={renderProductCard}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productList}
              />
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Sale</Text>
                  <Text style={styles.sectionSubtitle}>Super summer sale</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                key="saleList"
                data={saleProducts}
                renderItem={renderProductCard}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productList}
              />
            </View>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
        <BottomTabBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  banner: {
    backgroundColor: '#0A8D48',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '80%',
    height: '80%',
    position: 'absolute',
  },
  bannerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 'auto',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  checkButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 80,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  checkButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    padding: 20,
    minHeight: 300,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionSubtitle: {
    color: '#9B9B9B',
    fontSize: 11,
    marginTop: 4,
  },
  viewAll: {
    color: '#9B9B9B',
    fontSize: 11,
  },
  productList: {
    paddingRight: 20,
  },
  cardWrapper: {
    width: 160,
    marginRight: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    aspectRatio: 1,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#fff',
    borderRadius: 17,
  },
  productInfo: {
    padding: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    margin: 0,
    padding: 0,
  },
  reviewCount: {
    fontSize: 10,
    color: '#9B9B9B',
    marginLeft: 4,
  },
  productName: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
  bottomPadding: {
    height: 20,
  },
});

export default HomeScreen;
