// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';

// const products = [
//   {
//     id: '1',
//     title: 'Casaco Oversized',
//     price: 'R$ 299,90',
//     image:
//       'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
//   },
//   {
//     id: '2',
//     title: 'Jaqueta Winter Black',
//     price: 'R$ 359,90',
//     image:
//       'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
//   },
//   {
//     id: '3',
//     title: 'Moletom Premium',
//     price: 'R$ 189,90',
//     image:
//       'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
//   },
//   {
//     id: '4',
//     title: 'Sobretudo Elegance',
//     price: 'R$ 449,90',
//     image:
//       'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
//   },
//   {
//     id: '5',
//     title: 'Blusa Gola Alta',
//     price: 'R$ 159,90',
//     image:
//       'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
//   },
//   {
//     id: '6',
//     title: 'Jaqueta Urban Ice',
//     price: 'R$ 329,90',
//     image:
//       'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
//   },
// ];

// export default function ExploreScreen() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <Text style={styles.subtitle}>Coleções 2026</Text>

//         <Text style={styles.title}>ESPECIAL{"\n"}COLLECTIONS</Text>

//         <Text style={styles.description}>
//           Explore as novas tendências com peças modernas,
//           elegantes e minimalistas.
//         </Text>
//       </View>

//       {/* LISTA */}
//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           paddingBottom: 100,
//         }}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.card}>
//             <Image
//               source={{ uri: item.image }}
//               style={styles.image}
//             />

//             <View style={styles.info}>
//               <Text style={styles.productTitle}>
//                 {item.title}
//               </Text>

//               <Text style={styles.price}>{item.price}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0B0B0B',
//     paddingTop: 40,
//   },

//   header: {
//     paddingHorizontal: 20,
//     marginBottom: 25,
//   },

//   subtitle: {
//     color: '#8A8A8A',
//     fontSize: 14,
//     letterSpacing: 2,
//     marginBottom: 10,
//     textTransform: 'uppercase',
//   },

//   title: {
//     color: '#FFFFFF',
//     fontSize: 42,
//     fontWeight: '900',
//     lineHeight: 45,
//     marginBottom: 15,
//   },

//   description: {
//     color: '#B0B0B0',
//     fontSize: 15,
//     lineHeight: 24,
//   },

//   card: {
//     flex: 1,
//     margin: 10,
//     backgroundColor: '#151515',
//     borderRadius: 22,
//     overflow: 'hidden',
//   },

//   image: {
//     width: '100%',
//     height: 260,
//   },

//   info: {
//     padding: 15,
//   },

//   productTitle: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//   },

//   price: {
//     color: '#D6D6D6',
//     fontSize: 15,
//     fontWeight: 'bold',
//   },
// });



import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: '1',
    title: 'Casaco Oversized',
    price: 299.9,
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Jaqueta Winter Black',
    price: 359.9,
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Moletom Premium',
    price: 189.9,
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Sobretudo Elegance',
    price: 449.9,
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  },
];

export default function ExploreScreen() {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>Coleções 2026</Text>

          <Text style={styles.title}>
            WINTER{'\n'}COLLECTION
          </Text>
        </View>

        {/* CARRINHO */}
        <View style={styles.cartContainer}>
          <Text style={styles.cartIcon}>🛒</Text>

          <View style={styles.cartBadge}>
            <Text style={styles.cartCount}>
              {cart.length}
            </Text>
          </View>
        </View>
      </View>

      {/* TOTAL */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: R$ {total.toFixed(2)}
        </Text>
      </View>

      {/* PRODUTOS */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={styles.info}>
              <Text style={styles.productTitle}>
                {item.title}
              </Text>

              <Text style={styles.price}>
                R$ {item.price.toFixed(2)}
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.buttonText}>
                  Adicionar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    paddingTop: 40,
  },

  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subtitle: {
    color: '#8A8A8A',
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 10,
    textTransform: 'uppercase',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 42,
  },

  cartContainer: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartIcon: {
    fontSize: 24,
  },

  cartBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartCount: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },

  totalContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  totalText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },

  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#151515',
    borderRadius: 22,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 240,
  },

  info: {
    padding: 15,
  },

  productTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  price: {
    color: '#D6D6D6',
    fontSize: 15,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});