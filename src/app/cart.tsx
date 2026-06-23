import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCart } from '@/context/CartContext';

export default function CartScreen() {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione produtos antes de finalizar a compra.');
      return;
    }
    if (!name.trim() || !address.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha nome e endereço para entrega.');
      return;
    }

    Alert.alert(
      'Compra Finalizada!',
      `Obrigado, ${name}! Seu pedido no valor de R$ ${total.toFixed(2)} foi confirmado e será entregue em: ${address}`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>SHOPPING BAG</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Feather name="x" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          </View>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.cartId}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  {item.size && <Text style={styles.itemSize}>Tamanho: {item.size}</Text>}
                  <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.cartId)}>
                  <Feather name="trash-2" size={20} color="#999" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>

      {/* CHECKOUT FORM */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço de entrega"
          placeholderTextColor="#999"
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>FINALIZAR COMPRA</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay_700Bold',
    letterSpacing: 2,
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter_400Regular',
    color: '#666',
    fontSize: 14,
  },
  listContent: {
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemImage: {
    width: 60,
    height: 80,
    backgroundColor: '#F5F5F5',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  itemSize: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#000',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FAFAFA',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    letterSpacing: 2,
    color: '#666',
  },
  totalValue: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 4,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    letterSpacing: 2,
  },
});
