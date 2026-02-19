import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useTheme } from '../App';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart } = useTheme();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 1000,
                        }}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '100%',
                            maxWidth: '450px',
                            height: '100%',
                            background: 'var(--bg-primary)',
                            boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.1)',
                            zIndex: 1001,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <ShoppingBag size={24} color="var(--primary)" />
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your Cart ({cart.length})</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                style={{ background: 'var(--bg-secondary)', border: 'none', padding: '0.5rem', borderRadius: '50%', color: 'var(--text-primary)', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                            {cart.length === 0 ? (
                                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <ShoppingBag size={64} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                                    <p style={{ fontSize: '1.1rem' }}>Your cart is empty.</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        style={{ marginTop: '1.5rem', color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {cart.map((item) => (
                                        <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: '80px', height: '80px', borderRadius: 'var(--radius)', objectFit: 'cover' }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{item.name}</h4>
                                                <p style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '0.75rem' }}>₹{item.price.toFixed(2)}</p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', padding: '0.25rem' }}>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            style={{ background: 'none', border: 'none', padding: '0.25rem', color: 'var(--text-primary)', cursor: 'pointer' }}
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            style={{ background: 'none', border: 'none', padding: '0.25rem', color: 'var(--text-primary)', cursor: 'pointer' }}
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'underline', cursor: 'pointer' }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Subtotal</span>
                                    <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <Link
                                    to="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="button primary"
                                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', padding: '1.25rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}
                                >
                                    Proceed to Checkout <ArrowRight size={20} />
                                </Link>
                                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                                    Shipping and taxes calculated at checkout.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
