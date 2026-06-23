import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import React, { useEffect, useRef } from 'react';
import { Pressable, View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCart } from '@/context/CartContext';
import { useScroll } from '@/context/ScrollContext';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="index" href="/" asChild>
            <TabButton>HOME</TabButton>
          </TabTrigger>
          
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>SHOP</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <View style={[styles.tabButtonView, isFocused && styles.tabButtonViewActive]}>
        <Text style={[styles.tabText, isFocused && styles.tabTextActive]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const { cart } = useCart();
  const { isNavbarVisible } = useScroll();
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isNavbarVisible ? 0 : -100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isNavbarVisible]);

  return (
    <Animated.View {...props} style={[styles.tabListContainer, { transform: [{ translateY }] }]}>
      <View style={styles.innerContainer}>
        {/* ESQUERDA: Logo */}
        <Text style={styles.brandText}>
          MINDSE7
        </Text>

        {/* CENTRO: Links de Navegação */}
        <View style={styles.navLinks}>
          {props.children}
        </View>

        {/* DIREITA: Ícones (Pesquisa e Carrinho) */}
        <View style={styles.headerRight}>
          <Feather name="search" size={20} color="#000" style={styles.iconMargin} />
          <TouchableOpacity 
            style={styles.cartContainer} 
            onPress={() => router.push('/cart')}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Feather name="shopping-bag" size={20} color="#000" />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartCount}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    zIndex: 9999, // Super high z-index to stay above everything
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
  },
  brandText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    letterSpacing: 3,
    color: '#000',
    flex: 1, // To balance the layout
  },
  navLinks: {
    flexDirection: 'row',
    gap: 20,
    flex: 1,
    justifyContent: 'center', // Center the links
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end', // Right align icons
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
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: '#FFF',
    fontSize: 9,
    fontFamily: 'Inter_600SemiBold',
  },
  pressed: {
    opacity: 0.5,
  },
  tabButtonView: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tabButtonViewActive: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tabText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    letterSpacing: 2,
    color: '#666',
  },
  tabTextActive: {
    color: '#000',
  },
});
