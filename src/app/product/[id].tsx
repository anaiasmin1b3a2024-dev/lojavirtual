import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useCart } from '@/context/CartContext';

// Mock product database for details
const mockProducts: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Oversized Coat',
    price: 299.9,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    description: 'Casaco alongado com modelagem oversized. Peça de alfaiataria premium desenvolvida em lã mista, com forro em cetim. Perfeito para compor looks de inverno com sofisticação.',
  },
  '2': {
    id: '2',
    title: 'Winter Black Jacket',
    price: 359.9,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    description: 'Jaqueta em couro sintético com acabamento fosco. Fechamento frontal por zíper e bolsos laterais. Design utilitário e moderno.',
  },
  '3': {
    id: '3',
    title: 'Premium Hoodie',
    price: 189.9,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
    description: 'Moletom 100% algodão orgânico, toque extremamente macio. Capuz com forro duplo e modelagem unissex confortável.',
  },
  '4': {
    id: '4',
    title: 'Elegance Trench',
    price: 449.9,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    description: 'Trench coat clássico com cinto para amarração. Feito com material resistente à água, perfeito para dias de chuva na cidade mantendo a elegância.',
  },
  '5': {
    id: '5',
    title: 'Turtleneck Knit',
    price: 159.9,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    description: 'Tricô gola alta canelado. Peça coringa para sobreposições. Fio especial que não faz "bolinhas" após a lavagem.',
  },
  '6': {
    id: '6',
    title: 'Urban Puffer',
    price: 329.9,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    description: 'Jaqueta puffer com isolamento térmico avançado. Leve e quentinha, ideal para enfrentar o frio extremo com estilo streetwear.',
  },
};

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = mockProducts[id || '1'];
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('M');
  const sizes = ['P', 'M', 'G', 'GG'];

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    router.back();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Confira este incrível ${product.title} por apenas R$ ${product.price.toFixed(2)} na MINDSE7!`,
        url: product.image,
        title: product.title,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.topActions}>
            <TouchableOpacity onPress={handleShare} style={styles.iconBtn}>
              <Feather name="share" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <Feather name="x" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>

          <Text style={styles.sectionTitle}>DESCRIÇÃO</Text>
          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.sectionTitle}>TAMANHO</Text>
          <View style={styles.sizesContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeBtn, selectedSize === size && styles.sizeBtnActive]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[styles.sizeText, selectedSize === size && styles.sizeTextActive]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>ADICIONAR AO CARRINHO</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 500,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topActions: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
  },
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 28,
    color: '#000',
    marginBottom: 8,
  },
  price: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 2,
    color: '#999',
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
    marginBottom: 30,
  },
  sizesContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  sizeBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeBtnActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  sizeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#000',
  },
  sizeTextActive: {
    color: '#FFF',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  addButton: {
    backgroundColor: '#000',
    paddingVertical: 18,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    letterSpacing: 2,
  },
});
