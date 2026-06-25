import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const winterProducts = [
  {
    id: '1',
    name: 'Arctic Coat',
    price: 'R$ 349,90',
    info: 'Casaco premium para baixas temperaturas.',
    image:
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800',
  },
  {
    id: '2',
    name: 'Aurora Jacket',
    price: 'R$ 289,90',
    info: 'Jaqueta urbana com acabamento térmico.',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800',
  },
  {
    id: '3',
    name: 'Glacier Sweater',
    price: 'R$ 219,90',
    info: 'Suéter confortável em lã macia.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
  },
];

export default function WinterScreen() {
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.collection}>
            WINTER COLLECTION
          </Text>

          <Text style={styles.title}>
            WINTER 2026
          </Text>

          <Text style={styles.subtitle}>
            Elegância e conforto para os dias frios.
          </Text>
        </View>
      }
      data={winterProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />

          <View style={styles.content}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.info}>
              {item.info}
            </Text>

            <Text style={styles.price}>
              {item.price}
            </Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>
                COMPRAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7ECF2',
  },

  header: {
    padding: 30,
    backgroundColor: '#1F2D3D',
  },

  collection: {
    color: '#BFCAD6',
    letterSpacing: 3,
    marginBottom: 10,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#D6DEE7',
    marginTop: 10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 300,
  },

  content: {
    padding: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1F2D3D',
  },

  info: {
    color: '#666',
    marginVertical: 10,
  },

  price: {
    fontSize: 20,
    color: '#243447',
    fontWeight: 'bold',
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#243447',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
