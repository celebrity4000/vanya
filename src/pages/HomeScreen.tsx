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
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {images} from '../assets/images/images';
import BottomTabBar from '../navigation/BottomTabBar';

interface ProductItem {
  id: string;
  name: string;
  price: string;
  image: any;
  isNew: boolean;
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
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const windowHeight = Dimensions.get('window').height;

  const products: ProductItem[] = [
    {
      id: '1',
      name: 'Aata',
      price: '30$',
      image: images.aata,
      isNew: true,
    },
    {
      id: '2',
      name: 'Aata Premium',
      price: '40$',
      image: images.aata,
      isNew: false,
    },
    {
      id: '3',
      name: 'Aata Gold',
      price: '50$',
      image: images.aata,
      isNew: true,
    },
    {
      id: '4',
      name: 'Aata Supreme',
      price: '60$',
      image: images.aata,
      isNew: false,
    },
  ];

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
          <IconButton icon="heart-outline" size={20} iconColor="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
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
          <View style={[styles.banner, {height: windowHeight * 0.8}]}>
            <Image
              source={images.banner}
              style={styles.bannerImage}
              resizeMode="contain"
            />
            <Text style={styles.bannerTitle}>Bumper Aata{'\n'}Sale</Text>
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.checkButtonText}>Check</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.newSection, {minHeight: windowHeight * 0.2}]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>New</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.subTitle}>You've never seen it before!</Text>

            <FlatList
              key="horizontalList"
              data={products}
              renderItem={renderProductCard}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productList}
            />
          </View>
        </ScrollView>
        <BottomTabBar />
      </View>
      {/* <TabNavigator /> */}
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
  newSection: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAll: {
    color: '#666',
    fontSize: 14,
  },
  subTitle: {
    color: '#666',
    fontSize: 12,
    marginBottom: 20,
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
  },
  productInfo: {
    padding: 8,
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
});

export default HomeScreen;
