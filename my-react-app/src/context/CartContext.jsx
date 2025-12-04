import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addToCartAPI,
  getCartAPI,
  removeFromCartAPI,
  incrementCartItemAPI,
  decrementCartItemAPI
} from "../services/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = 2; // 🔐 Replace this with real logged‑in user ID later

  // Load cart when mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await getCartAPI(userId);
      const data = res.data.data;

      setCartItems((prev) => {
        const formatted = data.items.map((item, index) => {
          // Try to get restaurant if known from previous list
          const old = prev.find((p) => p.name === item.ItemName && p.size === item.Size);
          return {
            id: index,
            name: item.ItemName,
            price: parseFloat(item.Price),
            quantity: item.Quantity,
            size: item.Size,
            restaurant: item.RestaurantName || old?.restaurant || "",
            subtotal: parseFloat(item.subtotal),
          };
        });
        return formatted;
      });
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const addToCart = async (
    product,
    quantity = 1,
    size = "Medium",
    restaurantName = ""
  ) => {
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
      await loadCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // delete item both backend + local list
  const removeFromCart = async (id) => {
    try {
      const item = cartItems.find((i) => i.id === id);
      if (!item) return;

      const payload = {
        user_id: userId,
        item_name: item.name,
        restaurant_name: item.restaurant || "", // crucial field for backend
        size: item.size,
      };

      console.log("Deleting cart item:", payload);
      const res = await removeFromCartAPI(payload);
      console.log("Backend response →", res.data);
      await loadCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // Backend‑linked Increment
  const increaseQty = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const payload = {
      user_id: userId,
      item_name: item.name,
      restaurant_name: item.restaurant,
      size: item.size,
    };

    try {

      console.log("Increment payload:", payload); // ✅ Outgoing payload
      const res = await incrementCartItemAPI(payload); // 🧠 API call
      console.log("Increment API response:", res.data);
      await loadCart();
      console.log("Increment payload:", payload);
    } catch (err) {
      console.error("Error incrementing quantity:", err);
    }
  };

  // Backend‑linked Decrement
  const decreaseQty = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const payload = {
      user_id: userId,
      item_name: item.name,
      restaurant_name: item.restaurant,
      size: item.size,
    };
    
    try {
      console.log("Decrementing item:", payload);
      await decrementCartItemAPI(payload);
      await loadCart(); // refresh no matter update or removal
    } catch (err) {
      console.error("Error decrementing quantity:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);