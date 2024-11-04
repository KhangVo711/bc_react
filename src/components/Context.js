import React, { useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const [isData, setIsData] = useState({});
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsData(decodedToken);
    }
    else {
      setIsData({});
    }
    
  }, [token]);

  const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.masp === product.masp);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.masp === product.masp ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const decreaseQuantity = (productId) => {
      setCart((prevCart) =>
          prevCart
              .map((item) =>
                  item.masp === productId
                      ? { ...item, quantity: item.quantity - 1 }
                      : item
              )
              .filter((item) => item.quantity > 0) 
      );
  };
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
        prevCart
            .map((item) =>
                item.masp === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
            .filter((item) => item.quantity > 0) 
    );
};

  const removeItem = (productId) => {
      setCart((prevCart) => prevCart.filter((item) => item.masp !== productId));
  };

  return (
    <Context.Provider value= {{isData, setIsData, cart, addToCart, decreaseQuantity, removeItem, increaseQuantity, setCart}}>
      {children}
    </Context.Provider>
  )
}