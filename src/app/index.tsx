import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const banners = [
  {
    id: '1',
    title: 'MINDSE7',
    subtitle: 'C&A + WORKING TITLE',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b',
  },
  {
    id: '2',
    title: 'NEW COLLECTION',
    subtitle: 'URBAN STYLE',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
  },
  {
    id: '3',
    title: 'FASHION DROP',
    subtitle: 'WINTER 2026',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
  },
];

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef();

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* BANNER SUPERIOR */}
      <View style={styles.topBanner}>
        <Text style={styles.topText}>
          compre em até <Text style={styles.bold}>7x sem juros</Text>
        </Text>
      </View>

      {/* CARROSSEL */}
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item.image }}
            style={styles.banner}
          >
            <View style={styles.overlay} />

            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.subtitle}>{item.subtitle}</Text>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Comprar</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      />

      {/* PAGINAÇÃO */}
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
    backgroundColor: '#000',
  },

  topBanner: {
    height: 60,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topText: {
    color: '#fff',
    fontSize: 20,
  },

  bold: {
    fontWeight: 'bold',
  },

  banner: {
    width: width,
    height: height * 0.9,
    justifyContent: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  content: {
    paddingHorizontal: 30,
    justifyContent: 'center',
    height: '100%',
  },

  title: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 4,
    marginBottom: 10,
  },

  subtitle: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#fff',
    width: 140,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },

  pagination: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#777',
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: '#fff',
    width: 22,
  },
});