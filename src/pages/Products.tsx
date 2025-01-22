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
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {images} from '../assets/images/images';
import BottomTabBar from '../navigation/BottomTabBar';

interface ProductItem {
  id: string;
  name: string;
  price: string;
  image: any;
  rating: number;
  reviews: number;
  isNew: boolean;
}

const Product: React.FC = () => {
  const windowHeight = Dimensions.get('window').height;

  const saleProducts: ProductItem[] = [
    {
      id: '1',
      name: 'Ghee',
      price: '30$',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
    {
      id: '2',
      name: 'Ghee',
      price: '30$',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
    {
      id: '3',
      name: 'Premium Ghee',
      price: '40$',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
  ];

  const newProducts: ProductItem[] = [
    {
      id: '1',
      name: 'Aata',
      price: '30$',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
    {
      id: '2',
      name: 'Aata',
      price: '30$',
      image: images.aata,
      rating: 0,
      reviews: 0,
      isNew: true,
    },
    {
      id: '3',
      name: 'Premium Aata',
      price: '40$',
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

  const renderProductCard = ({item}: {item: ProductItem}) => (
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
        <TouchableOpacity style={styles.favoriteButton}>
          <IconButton icon="heart-outline" size={20} iconColor="#9B9B9B" />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <View style={styles.ratingRow}>
          {renderRatingStars(item.rating)}
          <Text style={styles.reviewCount}>({item.reviews})</Text>
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
            <Text style={styles.bannerTitle}>Street clothes</Text>
          </View>

          <View style={styles.section}>
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

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>New</Text>
                <Text style={styles.sectionSubtitle}>
                  You've never seen it before!
                </Text>
              </View>
              <TouchableOpacity>
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
          </View>

          {/* Add extra padding at the bottom */}
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
    height: 20, // Adds some padding at the bottom of the scroll view
  },
});

export default Product;
