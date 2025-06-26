"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
const CartContext = createContext();
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!action.payload || !action.payload.id) {
        console.error("Invalid product in ADD_ITEM:", action.payload);
        return state;
      }
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    case "LOAD_CART":
      return {
        ...state,
        items: action.payload || [],
      };
    default:
      return state;
  }
};
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
        dispatch({ type: "LOAD_CART", payload: [] });
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);
  const addItem = (product) => {
    if (!product || !product.id) {
      console.error("Invalid product passed to addItem:", product);
      return;
    }
    dispatch({ type: "ADD_ITEM", payload: product });
  };
  const removeItem = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: productId, quantity },
      });
    }
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const getCartTotal = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
