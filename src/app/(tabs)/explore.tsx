import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Share,
  Alert,
  Animated,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCart } from '@/context/CartContext';
import { useScroll } from '@/context/ScrollContext';

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: '1',
    title: 'Oversized Coat',
    price: 299.9,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Winter Black Jacket',
    price: 359.9,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Premium Hoodie',
    price: 189.9,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Elegance Trench',
    price: 449.9,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    title: 'Turtleneck Knit',
    price: 159.9,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    title: 'Urban Puffer',
    price: 329.9,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
  },
];

export default function ExploreScreen() {
  const { cart, addToCart } = useCart();
  const { setIsNavbarVisible } = useScroll();
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastOffsetY = useRef(0);

  React.useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value > lastOffsetY.current && value > 50) {
        setIsNavbarVisible(false); // Hide when scrolling down
      } else if (value < lastOffsetY.current || value <= 0) {
        setIsNavbarVisible(true);  // Show when scrolling up or at top
      }
      lastOffsetY.current = value;
    });
    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY, setIsNavbarVisible]);

  // Header fades out as you scroll down
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const shareProduct = async (product: Product) => {
    try {
      const result = await Share.share({
        message: `Confira este ${product.title} por R$ ${product.price.toFixed(2)} na nossa loja!`,
        url: product.image,
        title: product.title,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const openProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  const openCart = () => {
    router.push('/cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* MINIMAL HEADER - Sticky at top, fades on scroll */}
      {Platform.OS !== 'web' && (
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <View>
            <Text style={styles.subtitle}>2026 EDIT</Text>
            <Text style={styles.title}>NEW IN</Text>
          </View>

          <View style={styles.headerRight}>
            <Feather name="search" size={24} color="#000" style={styles.iconMargin} />
            
            {/* HITSLOP adicionado para tornar o icone de carrinho mais fácil de clicar */}
            <TouchableOpacity 
              style={styles.cartContainer} 
              onPress={openCart}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <Feather name="shopping-bag" size={24} color="#000" />
              {cart.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartCount}>{cart.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* PRODUCTS GRID */}
      <Animated.FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openProduct(item.id)} activeOpacity={0.9}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              
              <View style={styles.cardActions}>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={(e) => {
                    e.stopPropagation(); 
                    shareProduct(item);
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Feather name="share" size={16} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={(e) => {
                    e.stopPropagation(); 
                    addToCart(item, 'M'); 
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Feather name="plus" size={18} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.info}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
  header: {
    position: 'absolute', // Makes it float over the flatlist
    top: 50, // Provide safe area padding for iOS/Android
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight white background to make it readable
    zIndex: 100, // Ensure it's above the flatlist
    paddingBottom: 10,
  },
  subtitle: {
    color: '#666666',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    color: '#000000',
    fontSize: 28,
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
  },
  iconMargin: {
    marginRight: 20,
  },
  cartContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: '#FFF',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  listContent: {
    paddingTop: 100, // Push list down so it starts below the absolute header
    paddingBottom: 100,
    paddingHorizontal: 15,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 30,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 3 / 4,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  cardActions: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'column',
    gap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  info: {
    paddingHorizontal: 4,
  },
  productTitle: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  price: {
    color: '#333333',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
});