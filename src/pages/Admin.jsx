import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Package, User, MapPin, IndianRupee, Clock, Trash2, RefreshCw, Ticket } from 'lucide-react';
import { useTheme } from '../App';

const Admin = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [newPizza, setNewPizza] = useState({ name: '', price: '', category: 'Classic', image: '', description: '' });
    const [newCoupon, setNewCoupon] = useState({ code: '', discount: '' });

    const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'menu', or 'coupons'
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const { orders, pizzas, updatePizzaPrice, addPizza, deletePizza, deleteOrder, coupons, addCoupon, deleteCoupon, updateOrderStatus } = useTheme();

    // Auto-refresh simulation (simply updates the timestamp to show it's "live")
    useEffect(() => {
        if (!isAuthenticated) return;

        const interval = setInterval(() => {
            setLastRefresh(new Date());
        }, 30000); // Pulse every 30s

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'efron555') {
            setIsAuthenticated(true);
        } else {
            setError('Invalid password. Please try again.');
        }
    };

    const handleAddPizza = (e) => {
        e.preventDefault();
        addPizza({ ...newPizza, price: parseFloat(newPizza.price) });
        setNewPizza({ name: '', price: '', category: 'Veg', image: '', description: '' });
    };

    const totalProfit = orders.reduce((acc, order) => acc + order.total, 0);

    if (!isAuthenticated) {
        return (
            <div className="container" style={{ padding: '6rem 0', display: 'flex', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass"
                    style={{ padding: '3rem', borderRadius: 'var(--radius-xl)', maxWidth: '400px', width: '100%', textAlign: 'center' }}
                >
                    <div style={{ background: 'var(--bg-secondary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <Lock size={30} color="var(--primary)" />
                    </div>
                    <h1 style={{ marginBottom: '1rem' }}>Admin Login</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Enter password to access the dashboard.</p>

                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: 'var(--radius)',
                                border: '1px solid var(--border)',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                marginBottom: '1rem',
                                outline: 'none'
                            }}
                        />
                        {error && <p style={{ color: 'var(--primary)', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>}
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '1rem',
                                borderRadius: 'var(--radius-full)',
                                fontWeight: 700
                            }}
                        >
                            Access Dashboard
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin <span className="gradient-text">Dashboard</span></h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <div style={{ position: 'relative', width: '8px', height: '8px' }}>
                            <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#10b981' }} />
                            <motion.div
                                animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#10b981' }}
                            />
                        </div>
                        <span>Live Refresh Active</span>
                        <span style={{ opacity: 0.5 }}>•</span>
                        <span>Updated: {lastRefresh.toLocaleTimeString()}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => setActiveTab('orders')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-full)',
                            background: activeTab === 'orders' ? 'var(--primary)' : 'var(--bg-secondary)',
                            color: activeTab === 'orders' ? 'white' : 'var(--text-primary)',
                            fontWeight: 600
                        }}
                    >
                        Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('menu')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-full)',
                            background: activeTab === 'menu' ? 'var(--primary)' : 'var(--bg-secondary)',
                            color: activeTab === 'menu' ? 'white' : 'var(--text-primary)',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Manage Menu
                    </button>
                    <button
                        onClick={() => setActiveTab('coupons')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-full)',
                            background: activeTab === 'coupons' ? 'var(--primary)' : 'var(--bg-secondary)',
                            color: activeTab === 'coupons' ? 'white' : 'var(--text-primary)',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Manage Coupons
                    </button>
                </div>
            </div>

            {/* Stats Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Total Profit</p>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>₹{totalProfit.toFixed(2)}</h2>
                </div>
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Total Orders</p>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--secondary)' }}>{orders.length}</h2>
                </div>
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Avg. Order Value</p>
                    <h2 style={{ fontSize: '2rem' }}>₹{orders.length > 0 ? (totalProfit / orders.length).toFixed(2) : '0.00'}</h2>
                </div>
            </div>

            {activeTab === 'orders' ? (
                <div style={{ display: 'grid', gap: '2rem' }}>
                    {orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                            <Package size={60} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                            <p style={{ fontSize: '1.25rem' }}>No orders received yet.</p>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass"
                                style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', position: 'relative' }}
                            >
                                <button
                                    onClick={() => deleteOrder(order.id)}
                                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', color: 'var(--text-muted)', cursor: 'pointer', border: 'none' }}
                                >
                                    <Trash2 size={20} />
                                </button>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
                                    <div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Customer</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <User size={18} color="var(--primary)" />
                                            <span style={{ fontWeight: 700 }}>{order.name}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Address</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <MapPin size={18} color="var(--primary)" />
                                            <span style={{ fontSize: '0.9rem' }}>{order.address}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Date & Time</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Clock size={18} color="var(--primary)" />
                                            <span style={{ fontSize: '0.9rem' }}>{order.date}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Total Amount</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <IndianRupee size={18} color="var(--primary)" />
                                            <div>
                                                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>₹{order.total.toFixed(2)}</span>
                                                {order.couponCode && (
                                                    <p style={{ fontSize: '0.7rem', color: '#10b981', mt: '0.25rem' }}>
                                                        Code: {order.couponCode} (-₹{order.discount.toFixed(2)})
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <p style={{ fontWeight: 700 }}>Order Items</p>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            {['Placed', 'Kitchen', 'On Way', 'Delivered'].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => updateOrderStatus(order.id, s)}
                                                    style={{
                                                        padding: '0.4rem 0.8rem',
                                                        borderRadius: 'var(--radius-full)',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        background: order.status === s ? 'var(--primary)' : 'var(--bg-secondary)',
                                                        color: order.status === s ? 'white' : 'var(--text-primary)',
                                                        border: '1px solid var(--border)',
                                                        cursor: 'pointer',
                                                        transition: 'var(--transition)'
                                                    }}
                                                >
                                                    {s}
                                                </button>
                                            ))}
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
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            ) : activeTab === 'menu' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
                    {/* Add New Pizza Form */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Add New Pizza</h2>
                        <form onSubmit={handleAddPizza} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Name</label>
                                <input required type="text" value={newPizza.name} onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Price (₹)</label>
                                    <input required type="number" step="0.01" value={newPizza.price} onChange={(e) => setNewPizza({ ...newPizza, price: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Category</label>
                                    <select value={newPizza.category} onChange={(e) => setNewPizza({ ...newPizza, category: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                                        <option>Veg</option>
                                        <option>Non-Veg</option>
                                        <option>Combo</option>
                                        <option>Drinks</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Image URL</label>
                                <input type="text" value={newPizza.image} onChange={(e) => setNewPizza({ ...newPizza, image: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description</label>
                                <textarea rows="3" value={newPizza.description} onChange={(e) => setNewPizza({ ...newPizza, description: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'none' }}></textarea>
                            </div>
                            <button type="submit" style={{ background: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: 'var(--radius-full)', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                                Add to Menu
                            </button>
                        </form>
                    </div>

                    {/* Edit Prices List */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Current Menu Analysis</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {pizzas.map((pizza) => (
                                <div key={pizza.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                                    <img src={pizza.image} alt={pizza.name} style={{ width: '50px', height: '50px', borderRadius: 'var(--radius)', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 600 }}>{pizza.name}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pizza.category}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ fontWeight: 700 }}>₹</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                defaultValue={pizza.price}
                                                onBlur={(e) => updatePizzaPrice(pizza.id, e.target.value)}
                                                style={{ width: '80px', padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 700 }}
                                            />
                                        </div>
                                        <button
                                            onClick={() => deletePizza(pizza.id)}
                                            style={{ background: 'none', color: 'var(--text-muted)', cursor: 'pointer', border: 'none' }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
                    {/* Add Coupon Form */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Generate Coupon Code</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addCoupon({ ...newCoupon, discount: parseInt(newCoupon.discount), isActive: true });
                                setNewCoupon({ code: '', discount: '' });
                            }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                        >
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Coupon Code</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. SLICE20"
                                    value={newCoupon.code}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', textTransform: 'uppercase' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Discount Percentage (%)</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="20"
                                    value={newCoupon.discount}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                                />
                            </div>
                            <button type="submit" style={{ background: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: 'var(--radius-full)', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                                Create Coupon
                            </button>
                        </form>
                    </div>

                    {/* Active Coupons List */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
                        <h2 style={{ marginBottom: '2rem' }}>Active Coupons</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {coupons.map((coupon) => (
                                <div key={coupon.code} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: 'var(--radius)', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                                    <div style={{ background: 'var(--primary-light)', padding: '0.5rem', borderRadius: 'var(--radius)', color: 'var(--primary)' }}>
                                        <Ticket size={24} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{coupon.code}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{coupon.discount}% Discount</p>
                                    </div>
                                    <button
                                        onClick={() => deleteCoupon(coupon.code)}
                                        style={{ background: 'none', color: 'var(--text-muted)', cursor: 'pointer', border: 'none' }}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                            {coupons.length === 0 && (
                                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No active coupons available.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
