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
import {useSelector, useDispatch} from 'react-redux';
import {images} from '../assets/images/images';
import BottomTabBar from '../navigation/BottomTabBar';
import {RootState} from '../redux/store';
import {toggleFavorite} from '../redux/favoritesSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
  Home: undefined;
  Shop: undefined;
  Favorites: undefined;
  Bag: undefined;
  Profile: undefined;
  ProductDetail: {productId: string};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Product: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const windowHeight = Dimensions.get('window').height;

  const aataProducts = [
    {
      id: 'aata_1',
      name: 'Khapali Gehun',
      price: '80',
      image: images.aata,
      rating: 4,
      reviews: 15,
      isNew: true,
    },
    {
      id: 'aata_2',
      name: 'Sharbati Gehun',
      price: '75',
      image: images.aata,
      rating: 4,
      reviews: 12,
      isNew: false,
    },
    {
      id: 'aata_3',
      name: 'Bajri Aata',
      price: '70',
      image: images.aata,
      rating: 5,
      reviews: 18,
      isNew: true,
    },
    {
      id: 'aata_4',
      name: 'Raagi',
      price: '70',
      image: images.aata,
      rating: 5,
      reviews: 18,
      isNew: true,
    },
    {
      id: 'aata_5',
      name: 'Barley',
      price: '70',
      image: images.aata,
      rating: 5,
      reviews: 18,
      isNew: true,
    },
    {
      id: 'aata_6',
      name: 'Sorghum',
      price: '70',
      image: images.aata,
      rating: 5,
      reviews: 18,
      isNew: true,
    },
    {
      id: 'aata_7',
      name: 'Chaana Aata',
      price: '70',
      image: images.aata,
      rating: 5,
      reviews: 18,
      isNew: true,
    },
    {
      id: 'aata_8',
      name: 'Gluten Free Aata',
      price: '70',
      image: images.aata,
      rating: 5,
      reviews: 18,
      isNew: true,
    },
  ];

  const daalProducts = [
    {
      id: 'daal_1',
      name: 'Arhar Dal',
      price: '120',
      image: images.aata,
      rating: 4,
      reviews: 20,
      isNew: false,
    },
    {
      id: 'daal_2',
      name: 'Moong Dal',
      price: '140',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: true,
    },
    {
      id: 'daal_3',
      name: 'Chana Dal',
      price: '90',
      image: images.aata,
      rating: 4,
      reviews: 16,
      isNew: false,
    },
    {
      id: 'daal_4',
      name: 'Laal Chana Dal',
      price: '90',
      image: images.aata,
      rating: 4,
      reviews: 16,
      isNew: false,
    },
    {
      id: 'daal_5',
      name: 'Mogar',
      price: '90',
      image: images.aata,
      rating: 4,
      reviews: 16,
      isNew: false,
    },
    {
      id: 'daal_6',
      name: 'Kabuli Chana',
      price: '90',
      image: images.aata,
      rating: 4,
      reviews: 16,
      isNew: false,
    },
    {
      id: 'daal_7',
      name: 'Ghughuni Matar',
      price: '90',
      image: images.aata,
      rating: 4,
      reviews: 16,
      isNew: false,
    },
    {
      id: 'daal_8',
      name: 'Lobia',
      price: '90',
      image: images.aata,
      rating: 4,
      reviews: 16,
      isNew: false,
    },
    {
      id: 'daal_9',
      name: 'Rajma',
      price: '90',
      image: images.aata,
      rating: 4,
      reviews: 16,
      isNew: false,
    },
  ];

  const gheeAndOilProducts = [
    {
      id: 'ghee_1',
      name: 'A2 Bilona Ghee',
      price: '999',
      image: images.aata,
      rating: 5,
      reviews: 30,
      isNew: true,
    },
    {
      id: 'ghee_2',
      name: 'Organic Ghee',
      price: '899',
      image: images.aata,
      rating: 4,
      reviews: 22,
      isNew: true,
    },

    {
      id: 'oil_1',
      name: 'Mustard Oil',
      price: '180',
      image: images.aata,
      rating: 4,
      reviews: 18,
      isNew: false,
    },
    {
      id: 'oil_2',
      name: 'Sunflower Oil',
      price: '180',
      image: images.aata,
      rating: 4,
      reviews: 18,
      isNew: false,
    },
    {
      id: 'oil_3',
      name: 'Groundnut Oil',
      price: '180',
      image: images.aata,
      rating: 4,
      reviews: 18,
      isNew: false,
    },
    {
      id: 'oil_4',
      name: 'Sesame Oil',
      price: '180',
      image: images.aata,
      rating: 4,
      reviews: 18,
      isNew: false,
    },
    {
      id: 'oil_5',
      name: 'Coconut Oil',
      price: '180',
      image: images.aata,
      rating: 4,
      reviews: 18,
      isNew: false,
    },
    {
      id: 'oil_6',
      name: 'Olive Oil',
      price: '180',
      image: images.aata,
      rating: 4,
      reviews: 18,
      isNew: false,
    },
    {
      id: 'oil_7',
      name: 'Almond Oil',
      price: '180',
      image: images.aata,
      rating: 4,
      reviews: 18,
      isNew: false,
    },
  ];

  const spicesProducts = [
    {
      id: 'spice_1',
      name: 'Haldi Powder',
      price: '80',
      image: images.aata,
      rating: 4,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'spice_2',
      name: 'Jeera Powder',
      price: '120',
      image: images.aata,
      rating: 5,
      reviews: 20,
      isNew: true,
    },
    {
      id: 'spice_3',
      name: 'Gota Dhania',
      price: '60',
      image: images.aata,
      rating: 4,
      reviews: 15,
      isNew: false,
    },
    {
      id: 'spice_4',
      name: 'Dhania Powder',
      price: '60',
      image: images.aata,
      rating: 4,
      reviews: 15,
      isNew: false,
    },
    {
      id: 'spice_5',
      name: 'Mirchi Powder',
      price: '60',
      image: images.aata,
      rating: 4,
      reviews: 15,
      isNew: false,
    },
    {
      id: 'spice_6',
      name: 'Aamchur',
      price: '60',
      image: images.aata,
      rating: 4,
      reviews: 15,
      isNew: false,
    },
    {
      id: 'spice_7',
      name: 'Sauf',
      price: '60',
      image: images.aata,
      rating: 4,
      reviews: 15,
      isNew: false,
    },
  ];

  const essentialProducts = [
    {
      id: 'essential_1',
      name: 'Poha',
      price: '50',
      image: images.aata,
      rating: 4,
      reviews: 22,
      isNew: false,
    },
    {
      id: 'essential_2',
      name: 'Brown Sugar',
      price: '60',
      image: images.aata,
      rating: 4,
      reviews: 18,
      isNew: true,
    },
    {
      id: 'essential_3',
      name: 'Kala Namak',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_4',
      name: 'Row Honey',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_5',
      name: 'Jaggery Powder',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_6',
      name: 'Khandsari Sugar',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_7',
      name: 'Bura',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_8',
      name: 'Sendha Namak',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_9',
      name: 'Aalu Chips',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_10',
      name: 'Aalu Papad',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_11',
      name: 'Sabudana Chips',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_12',
      name: 'Chaana Sattu',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_13',
      name: 'Jau Sattu',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_14',
      name: 'Wheat Daliya',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_15',
      name: 'Jau Daliya',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_16',
      name: 'Bajari Daliya',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_17',
      name: 'Bikaneri Papad',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_18',
      name: 'Bikaneri Methi Papad',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_19',
      name: 'Bikaneri Bhujiya',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_20',
      name: 'Mangodi',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
    {
      id: 'essential_21',
      name: 'Aachar',
      price: '40',
      image: images.aata,
      rating: 5,
      reviews: 25,
      isNew: false,
    },
  ];

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
              onPress={() => dispatch(toggleFavorite(item))}>
              <IconButton
                icon={isFavorite ? 'heart' : 'heart-outline'}
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

  const renderSection = (
    title: string,
    subtitle: string,
    data: ProductItem[],
  ) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </View>
  );

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
          <View style={[styles.banner, {height: windowHeight * 0.4}]}>
            <Image
              source={images.jar}
              style={styles.bannerImage}
              resizeMode="contain"
            />
            <Text style={styles.bannerTitle}>Rasoi Essentials</Text>
          </View>

          {renderSection('Aata Products', 'Fresh Mill Ground', aataProducts)}
          {renderSection('Dal Products', 'Pure & Natural', daalProducts)}
          {renderSection('Ghee & Oils', 'Pure & Natural', gheeAndOilProducts)}
          {renderSection('Spices', 'Fresh Ground', spicesProducts)}
          {renderSection('Daily Essentials', 'Basic Needs', essentialProducts)}

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
    width: 150,
    height: 150,
  },
  bannerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
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
    width: 150,
    marginLeft: 20,
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
    paddingVertical: 8,
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
  brandName: {
    color: '#9B9B9B',
    fontSize: 11,
    marginTop: 4,
  },
  productName: {
    fontSize: 16,
    marginTop: 4,
    color: '#000',
  },
  productPrice: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 4,
  },
  bottomPadding: {
    height: 20,
  },
});

export default Product;
