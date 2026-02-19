import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Login from './pages/Login';
import History from './pages/History';

// Theme Context
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [pizzas, setPizzas] = useState(() => {
    const saved = localStorage.getItem('pizzas');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'Margherita', price: 299, category: 'Veg', image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?w=500&auto=format&fit=crop&q=60', description: 'Fresh tomatoes, mozzarella, basil, and olive oil.', rating: 4.8 },
      { id: 2, name: 'Pepperoni', price: 449, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=60', description: 'Classic pepperoni with mozzarella and tomato sauce.', rating: 4.9 },
      { id: 3, name: 'BBQ Chicken', price: 499, category: 'Non-Veg', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60', description: 'Grilled chicken, BBQ sauce, red onions, and cilantro.', rating: 4.7 },
      { id: 4, name: 'Veggie Paradise', price: 399, category: 'Veg', image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500&auto=format&fit=crop&q=60', description: 'Mushrooms, bell peppers, onions, olives, and sweet corn.', rating: 4.6 },
      { id: 5, name: 'Mushroom Magic', price: 349, category: 'Veg', image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=500&auto=format&fit=crop&q=60', description: 'Assorted mushrooms with truffle oil and mozzarella.', rating: 4.8 },
      { id: 6, name: 'Paneer Tikka', price: 449, category: 'Veg', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60', description: 'Spicy paneer tikka, capsicum, and onions.', rating: 4.9 },
    ];
  });

  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem('coupons');
    if (saved) return JSON.parse(saved);
    return [
      { code: 'SLICE50', discount: 50, isActive: true },
      { code: 'WELCOME10', discount: 10, isActive: true }
    ];
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('pizzas', JSON.stringify(pizzas));
  }, [pizzas]);

  useEffect(() => {
    localStorage.setItem('coupons', JSON.stringify(coupons));
  }, [coupons]);

  // Sync state across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'orders') {
        const newOrders = JSON.parse(e.newValue);
        if (JSON.stringify(newOrders) !== JSON.stringify(orders)) {
          setOrders(newOrders || []);
        }
      }
      if (e.key === 'pizzas') {
        const newPizzas = JSON.parse(e.newValue);
        if (JSON.stringify(newPizzas) !== JSON.stringify(pizzas)) {
          setPizzas(newPizzas || []);
        }
      }
      if (e.key === 'coupons') {
        const newCoupons = JSON.parse(e.newValue);
        if (JSON.stringify(newCoupons) !== JSON.stringify(coupons)) {
          setCoupons(newCoupons || []);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [orders, pizzas, coupons]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Open drawer when item added
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const addCoupon = (coupon) => {
    setCoupons(prev => [coupon, ...prev]);
  };

  const deleteCoupon = (code) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  const signupUser = (userData) => {
    const newUser = { ...userData, id: Date.now() };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const loginUser = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      status: 'Placed',
      userId: currentUser?.id || null,
      total: orderDetails.finalTotal || (cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 49),
      ...orderDetails,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart after order
    return newOrder.id; // Return ID to track it in checkout
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders((prev) => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const updatePizzaPrice = (id, newPrice) => {
    setPizzas((prev) => prev.map(p => p.id === id ? { ...p, price: parseFloat(newPrice) } : p));
  };

  const addPizza = (newPizza) => {
    setPizzas((prev) => [...prev, { ...newPizza, id: Date.now(), rating: 5.0 }]);
  };

  const deletePizza = (id) => {
    setPizzas((prev) => prev.filter(p => p.id !== id));
  };

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter(o => o.id !== id));
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode, toggleTheme,
      cart, addToCart, removeFromCart, updateQuantity,
      orders, placeOrder, updateOrderStatus,
      pizzas, updatePizzaPrice, addPizza, deletePizza, deleteOrder,
      isCartOpen, setIsCartOpen,
      coupons, addCoupon, deleteCoupon,
      currentUser, loginUser, signupUser, logoutUser
    }}>
      <Router>
        <div className="app-container">
          <Navbar />
          <CartDrawer />
          <main>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
