import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, CheckCircle, Package, Truck, Clock, Star, CreditCard } from 'lucide-react';
import { useTheme } from '../App';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const { cart, removeFromCart, updateQuantity, placeOrder, coupons, orders, currentUser } = useTheme();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [lastOrderId, setLastOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState({
        name: currentUser?.name || '',
        address: ''
    });
    const [userRating, setUserRating] = useState(0);
    const [step, setStep] = useState(1);

    // Coupon States
    const [couponInput, setCouponInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');

    const currentOrder = orders.find(o => o.id === lastOrderId);
    const currentStatus = currentOrder?.status || 'Placed';

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
    const deliveryFee = subtotal > 0 ? 49 : 0;
    const total = subtotal - discount + deliveryFee;

    const handleApplyCoupon = () => {
        const found = coupons.find(c => c.code === couponInput.toUpperCase() && c.isActive);
        if (found) {
            setAppliedCoupon(found);
            setCouponError('');
        } else {
            setCouponError('Invalid or inactive coupon code');
            setAppliedCoupon(null);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const id = placeOrder({ ...orderDetails, discount, finalTotal: total, couponCode: appliedCoupon?.code });
        setLastOrderId(id);
        setOrderPlaced(true);
    };

    if (orderPlaced) {
        return (
            <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass"
                    style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', borderRadius: 'var(--radius-xl)' }}
                >
                    <AnimatePresence mode="wait">
                        {currentStatus === 'Delivered' ? (
                            <motion.div
                                key="delivered"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div style={{ color: '#10b981', marginBottom: '2rem' }}>
                                    <CheckCircle size={100} style={{ margin: '0 auto' }} />
                                </div>
                                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }} className="gradient-text">Thank You!</h1>
                                <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Your order has been delivered. Enjoy your meal!</p>

                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <motion.button
                                            key={s}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setUserRating(s)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                                        >
                                            <Star
                                                size={45}
                                                fill={s <= userRating ? "var(--secondary)" : "none"}
                                                color="var(--secondary)"
                                                style={{ transition: 'all 0.3s ease' }}
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Rate us 5 stars if you liked the service!</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="tracking"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div style={{ color: 'var(--primary)', marginBottom: '2rem' }}>
                                    <Clock size={80} style={{ margin: '0 auto' }} />
                                </div>
                                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Tracking Order...</h1>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                    Current Status: <strong style={{ color: 'var(--primary)' }}>{currentStatus}</strong>
                                </p>

                                {/* Order Tracker */}
                                <div style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '3rem' }}>
                                    <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '2px', background: 'var(--border)', zIndex: 0 }}></div>
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '0',
                                        width: currentStatus === 'Placed' ? '0%' : currentStatus === 'Kitchen' ? '33%' : currentStatus === 'On Way' ? '66%' : '100%',
                                        height: '2px',
                                        background: 'var(--primary)',
                                        zIndex: 1,
                                        transition: 'width 0.5s ease'
                                    }}></div>

                                    {[
                                        { icon: <Package size={20} />, label: 'Placed', status: 'Placed' },
                                        { icon: <Package size={20} />, label: 'Kitchen', status: 'Kitchen' },
                                        { icon: <Truck size={20} />, label: 'On Way', status: 'On Way' },
                                        { icon: <CheckCircle size={20} />, label: 'Arrived', status: 'Delivered' }
                                    ].map((s, i) => {
                                        const statuses = ['Placed', 'Kitchen', 'On Way', 'Delivered'];
                                        const currentIndex = statuses.indexOf(currentStatus);
                                        const isActive = currentIndex >= i;

                                        return (
                                            <div key={i} style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                                                <motion.div
                                                    animate={{ scale: isActive ? 1.1 : 1 }}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        background: isActive ? 'var(--primary)' : 'var(--bg-secondary)',
                                                        color: isActive ? 'white' : 'var(--text-muted)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        margin: '0 auto 0.5rem',
                                                        border: '2px solid var(--border)',
                                                        boxShadow: isActive ? '0 0 15px var(--primary-light)' : 'none'
                                                    }}>
                                                    {s.icon}
                                                </motion.div>
                                                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s.label}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Link to="/" style={{ display: 'inline-block', background: 'var(--primary)', color: 'white', padding: '1rem 2rem', borderRadius: 'var(--radius-full)', fontWeight: 600, marginTop: '1rem' }}>
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h1 style={{ marginBottom: '3rem' }}>Complete Your <span className="gradient-text">Order</span></h1>

            {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>Your cart is empty.</p>
                    <Link to="/menu" style={{ background: 'var(--primary)', color: 'white', padding: '1rem 2rem', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
                        Browse Menu
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {/* Cart Section */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Cart Summary</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <AnimatePresence>
                                {cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        exit={{ opacity: 0, x: -20 }}
                                        className="glass"
                                        style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '1rem', alignItems: 'center' }}
                                    >
                                        <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius)', objectFit: 'cover' }} />
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ marginBottom: '0.25rem' }}>{item.name}</h4>
                                            <p style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{item.price}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-secondary)', padding: '0.4rem', borderRadius: 'var(--radius-full)' }}>
                                            <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none' }}><Minus size={16} /></button>
                                            <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none' }}><Plus size={16} /></button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', color: 'var(--text-muted)' }}>
                                            <Trash2 size={20} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="glass" style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                            {/* Coupon Input */}
                            <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                                <p style={{ fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem' }}>Have a coupon?</p>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                        style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.9rem' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyCoupon}
                                        style={{ background: 'var(--primary)', color: 'white', padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.8rem', border: 'none', cursor: 'pointer' }}
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponError && <p style={{ color: 'var(--primary)', fontSize: '0.75rem', marginTop: '0.5rem' }}>{couponError}</p>}
                                {appliedCoupon && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius)', color: '#10b981', fontSize: '0.8rem' }}>
                                        <span>Coupon <strong>{appliedCoupon.code}</strong> applied!</span>
                                        <button onClick={() => setAppliedCoupon(null)} style={{ background: 'none', color: '#10b981', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Remove</button>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            {appliedCoupon && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#10b981' }}>
                                    <span>Discount ({appliedCoupon.discount}%)</span>
                                    <span>-₹{discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Delivery Fee</span>
                                <span>₹{deliveryFee.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '1rem', fontWeight: 800, fontSize: '1.25rem' }}>
                                <span>Total</span>
                                <span className="gradient-text">₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Delivery Details</h2>
                        <form onSubmit={handlePlaceOrder} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
                                <input required name="name" type="text" value={orderDetails.name} onChange={handleChange} placeholder="John Doe" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Delivery Address</label>
                                <textarea required name="address" value={orderDetails.address} onChange={handleChange} placeholder="123 Pizza St, Foodie Avenue" rows="3" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'none' }}></textarea>
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Payment Method</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div style={{
                                        padding: '1rem', border: '2px solid var(--primary)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
                                    }}>
                                        <CreditCard size={20} color="var(--primary)" />
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Card</span>
                                    </div>
                                    <div style={{
                                        padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', opacity: 0.6
                                    }}>
                                        <Truck size={20} />
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>COD</span>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" style={{ width: '100%', background: 'var(--primary)', color: 'white', padding: '1.25rem', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '1.1rem', boxShadow: 'var(--shadow-premium)' }}>
                                Place Order - ₹{total.toFixed(2)}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
