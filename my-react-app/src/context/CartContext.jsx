import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addToCartAPI,
  getCartAPI,
  removeFromCartAPI,
  incrementCartItemAPI,
  decrementCartItemAPI,
} from "../services/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // temporary static user id

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await getCartAPI(userId);
      const data = res.data.data;

      if (!data || !data.items) return;

      const formatted = data.items.map((item) => ({
        id: `${item.ItemName}-${item.Size}-${item.RestaurantName || ""}`,
        name: item.ItemName,
        price: parseFloat(item.Price),
        quantity: item.Quantity,
        size: item.Size,
        restaurant: item.RestaurantName || "",
        subtotal: parseFloat(item.subtotal || 0),
      }));
      console.log("Cart data from backend:", data.items);
      setCartItems(formatted);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const addToCart = async (
    product,
    quantity = 2,
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
      await addToCartAPI(payload);
      await loadCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const item = cartItems.find((i) => i.id === id);
      if (!item) return;

      const payload = {
        user_id: userId,
        item_name: item.name,
        restaurant_name: item.restaurant,
        size: item.size,
      };

      await removeFromCartAPI(payload);

      // update UI instantly
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // 👇 Optimistic increment update
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
      await incrementCartItemAPI(payload);

      setCartItems((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } catch (err) {
      console.error("Error incrementing quantity:", err);
    }
  };

  // 👇 Optimistic decrement update
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
      await decrementCartItemAPI(payload);

      if (item.quantity === 1) {
        setCartItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        setCartItems((prev) =>
          prev.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          )
        );
      }
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
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);