import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';

const banners = [
  {
    id: '1',
    title: 'MINDSE7',
    subtitle: 'THE NEW EDIT',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    title: 'COLLECTION',
    subtitle: 'URBAN ESSENTIALS',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    title: 'FASHION DROP',
    subtitle: 'WINTER 2026',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
  },
];

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * width,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, width]);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setActiveIndex(roundIndex);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* MINIMALIST HEADER */}
      <View style={styles.topBanner}>
        <Text style={styles.topText}>
          FREE SHIPPING ON ORDERS OVER $100
        </Text>
      </View>

      {/* FULL SCREEN CAROUSEL */}
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item.image }}
            style={[styles.banner, { width, height }]}
            imageStyle={{ opacity: 0.9 }}
          >
            <View style={styles.overlay} />

            <View style={styles.content}>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.title}>{item.title}</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/explore')}
              >
                <Text style={styles.buttonText}>SHOP NOW</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      />

      {/* ELEGANT PAGINATION */}
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBanner: {
    height: 45,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  topText: {
    color: '#333333',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
  },
  banner: {
    justifyContent: 'flex-end', // Text at the bottom
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)', // Lighter overlay for brighter images
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 150, // space for tab bar and pagination
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 52,
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: 2,
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 4,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 0, // Sharp edges for editorial look
  },
  buttonText: {
    color: '#000000',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    letterSpacing: 2,
  },
  pagination: {
    position: 'absolute',
    bottom: 90,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
