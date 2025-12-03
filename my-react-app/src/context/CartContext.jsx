// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { addToCartAPI, getCartAPI } from "../services/cartApi"; // ✅ add this file per our earlier setup

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // 🔐 Replace this with real logged‑in user ID later

  // ✅ Load cart from backend on mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await getCartAPI(userId);
      const data = res.data.data;
      const formatted = data.items.map((item, index) => ({
        id: index, // simple internal identifier for UI mapping
        name: item.ItemName,
        price: parseFloat(item.Price),
        quantity: item.Quantity,
        size: item.Size,
        subtotal: parseFloat(item.subtotal),
      }));
      setCartItems(formatted);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // ✅ Add to cart → send to backend and refresh cart
  const addToCart = async (product, quantity = 1, size = "Medium", restaurantName = "") => {
    try {
      const payload = {
        user_id: userId,
        item_name: product.ItemName,
        restaurant_name: restaurantName || product.RestaurantName,
        quantity,
        size,
      };
      console.log("Adding to cart:", payload);
      await addToCartAPI(payload);
      await loadCart(); // refresh cart after adding
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // ✅ Local UI quantity adjustments (optional)
  const increaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );

  const decreaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, increaseQty, decreaseQty, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);