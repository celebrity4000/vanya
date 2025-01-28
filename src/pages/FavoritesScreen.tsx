import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
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

const {width, height} = Dimensions.get('window');
const scaleFactor = width / 375;

interface ProductItem {
  id: string;
  name: string;
  price: string;
  image: any;
  rating: number;
  reviews: number;
  category?: string;
  color?: string;
  size?: string;
  inStock?: boolean;
}

const FavoritesScreen = () => {
  const [sortByPrice, setSortByPrice] = useState(false);
  const [viewType, setViewType] = useState('list');
  const dispatch = useDispatch();
  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.items,
  );

  const categories = ['Summer', 'Pulses', 'Flours', 'Spices', 'Rice'];

  const renderStars = (rating: number) => (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map(star => (
        <IconButton
          key={star}
          icon={star <= rating ? 'star' : 'star-outline'}
          size={12 * scaleFactor}
          iconColor={star <= rating ? '#FFBA49' : '#DAD9E2'}
          style={styles.starIcon}
        />
      ))}
    </View>
  );

  const renderProductCard = ({item}: {item: ProductItem}) => (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => dispatch(toggleFavorite(item))}>
          <IconButton
            icon="close"
            size={16 * scaleFactor}
            iconColor="#9B9B9B"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.productDetails}>
        <View>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.productMetaContainer}>
            <Text style={styles.metaText}>Quality: {item.color}</Text>
            <Text style={styles.metaText}>Size: {item.size}</Text>
          </View>
          <View style={styles.priceRatingContainer}>
            <Text style={styles.price}>{item.price}</Text>
            <View style={styles.ratingRow}>
              {renderStars(item.rating)}
              <Text style={styles.reviewCount}>({item.reviews})</Text>
            </View>
          </View>
          {!item.inStock && (
            <Text style={styles.soldOut}>
              Sorry, this item is currently sold out
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <IconButton
            icon="shopping"
            size={20 * scaleFactor}
            iconColor="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="#F8F8F8"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Favorites</Text>
        </View>

        <View style={styles.contentContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersScroll}
            contentContainerStyle={styles.filtersScrollContent}>
            {categories.map(category => (
              <TouchableOpacity key={category} style={styles.filterButton}>
                <Text style={styles.filterButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.filterControl}>
              <IconButton
                icon="filter-variant"
                size={24 * scaleFactor}
                iconColor="#222222"
              />
              <Text style={styles.controlText}>Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sortControl}
              onPress={() => setSortByPrice(!sortByPrice)}>
              <IconButton
                icon="sort"
                size={24 * scaleFactor}
                iconColor="#222222"
              />
              <Text style={styles.controlText}>Price: lowest to high</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setViewType(viewType === 'list' ? 'grid' : 'list')
              }>
              <IconButton
                icon={viewType === 'list' ? 'view-list' : 'view-grid'}
                size={24 * scaleFactor}
                iconColor="#222222"
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={favoriteItems}
            renderItem={renderProductCard}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productList}
          />
        </View>
        <BottomTabBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20 * scaleFactor,
    paddingVertical: 15 * scaleFactor,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 34 * scaleFactor,
    fontWeight: 'bold',
    color: '#222222',
  },
  filtersScroll: {
    backgroundColor: '#fff',
    marginBottom: 0, // Added
  },
  filtersScrollContent: {
    paddingHorizontal: 16 * scaleFactor,
    paddingVertical: 8 * scaleFactor,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12 * scaleFactor,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    marginTop: 0, // Changed to 0
  },
  filterButton: {
    backgroundColor: '#222222',
    paddingHorizontal: 20 * scaleFactor,
    height: 36 * scaleFactor,
    borderRadius: 18 * scaleFactor,
    marginRight: 8 * scaleFactor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 13 * scaleFactor,
    textAlign: 'center',
    lineHeight: 16 * scaleFactor,
  },
  // controls: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   padding: 16 * scaleFactor,
  //   backgroundColor: '#fff',
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#F2F2F2',
  // },
  filterControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortControl: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 16 * scaleFactor,
  },
  controlText: {
    color: '#222222',
    fontSize: 11 * scaleFactor,
    marginLeft: 4 * scaleFactor,
  },
  productList: {
    padding: 16 * scaleFactor,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8 * scaleFactor,
    marginBottom: 16 * scaleFactor,
    padding: 16 * scaleFactor,
  },
  imageContainer: {
    width: 104 * scaleFactor,
    height: 104 * scaleFactor,
    marginRight: 16 * scaleFactor,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8 * scaleFactor,
  },
  closeButton: {
    position: 'absolute',
    top: -8 * scaleFactor,
    right: -8 * scaleFactor,
    backgroundColor: '#fff',
    borderRadius: 12 * scaleFactor,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  category: {
    color: '#9B9B9B',
    fontSize: 11 * scaleFactor,
    marginBottom: 4 * scaleFactor,
  },
  productName: {
    fontSize: 16 * scaleFactor,
    color: '#222222',
    marginBottom: 4 * scaleFactor,
  },
  productMetaContainer: {
    marginBottom: 8 * scaleFactor,
  },
  metaText: {
    color: '#9B9B9B',
    fontSize: 11 * scaleFactor,
  },
  priceRatingContainer: {
    marginBottom: 8 * scaleFactor,
  },
  price: {
    fontSize: 14 * scaleFactor,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 4 * scaleFactor,
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
    fontSize: 10 * scaleFactor,
    color: '#9B9B9B',
    marginLeft: 4 * scaleFactor,
  },
  soldOut: {
    color: '#FF3B30',
    fontSize: 11 * scaleFactor,
    marginTop: 8 * scaleFactor,
  },
  addToCartButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#DB3022',
    borderRadius: 20 * scaleFactor,
  },
});

export default FavoritesScreen;
