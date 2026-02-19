import React from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, IndianRupee, MapPin, ChevronRight, ShoppingBag } from 'lucide-react';
import { useTheme } from '../App';
import { Link, Navigate } from 'react-router-dom';

const History = () => {
    const { orders, currentUser } = useTheme();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    const myOrders = orders.filter(o => o.userId === currentUser.id);

    return (
        <div className="container" style={{ padding: '6rem 0' }}>
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Order <span className="gradient-text">History</span></h1>
                <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {currentUser.name}! Here are your past pizza journeys.</p>
            </div>

            {myOrders.length === 0 ? (
                <div className="glass" style={{ padding: '5rem', textAlign: 'center', borderRadius: 'var(--radius-xl)' }}>
                    <div style={{ background: 'var(--bg-secondary)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '1px solid var(--border)' }}>
                        <ShoppingBag size={40} color="var(--text-muted)" />
                    </div>
                    <h2 style={{ marginBottom: '1rem' }}>No Orders Yet</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>You haven't placed any orders yet. Let's change that!</p>
                    <Link to="/menu" className="gradient-btn" style={{ padding: '1rem 2.5rem', borderRadius: 'var(--radius-full)', color: 'white', fontWeight: 700, textDecoration: 'none' }}>
                        Browse Delicious Pizzas
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '2rem' }}>
                    {myOrders.map((order) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass"
                            style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', position: 'relative' }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
                                <div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Order Status</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: order.status === 'Delivered' ? '#10b981' : 'var(--primary)' }}></div>
                                        <span style={{ fontWeight: 700, color: order.status === 'Delivered' ? '#10b981' : 'var(--primary)' }}>{order.status}</span>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Date</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Clock size={16} color="var(--primary)" />
                                        <span style={{ fontSize: '0.9rem' }}>{order.date}</span>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Total Amount</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <IndianRupee size={16} color="var(--primary)" />
                                        <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>₹{order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>ID</p>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>#{order.id}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                {order.items.map((item, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--border)' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', objectFit: 'cover' }} />
                                        <div>
                                            <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
