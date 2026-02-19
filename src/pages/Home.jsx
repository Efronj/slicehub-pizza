import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Clock, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';

const Home = () => {
    const { addToCart, pizzas } = useTheme();

    const featuredPizzas = pizzas.slice(0, 4);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            {/* Hero Section */}
            <section className="hero" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '8rem 0', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
                <div className="container">
                    <motion.div variants={itemVariants} style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', width: 'fit-content', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--border)', margin: '0 auto 2rem' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)' }}>🔥 Craving for a slice?</span>
                        </div>
                        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)', lineHeight: 1.1, marginBottom: '2.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                            Hot & Fast <br />
                            <span className="gradient-text">SliceHub Pizza</span> <br />
                            At Your Door.
                        </h1>
                        <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '3.5rem', lineHeight: 1.4, fontWeight: 500 }}>
                            Premium hand-tossed pizzas delivered fresh and hot in 30 minutes.
                            Only the finest ingredients for the perfect slice.
                        </p>

                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Link to="/menu" className="button primary" style={{ padding: '1.25rem 3rem', fontSize: '1.2rem', fontWeight: 700, borderRadius: 'var(--radius-full)' }}>Order Now</Link>
                            <Link to="/menu" className="button secondary" style={{ padding: '1.25rem 3rem', fontSize: '1.2rem', fontWeight: 700, borderRadius: 'var(--radius-full)', border: '1px solid var(--border)' }}>View Menu</Link>
                        </div>

                        <div style={{ display: 'flex', gap: '4rem', marginTop: '5rem', justifyContent: 'center' }}>
                            <div>
                                <h4 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>50+</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Pizza Flavors</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>30m</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Delivery Time</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>4.9</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Rating</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Floating background elements for visual interest without the big image */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', border: '1px dashed var(--border)', borderRadius: '50%', opacity: 0.2, zIndex: -1 }}
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: '300px', height: '300px', border: '1px dashed var(--border)', borderRadius: '50%', opacity: 0.2, zIndex: -1 }}
                />
            </section>

            {/* Featured Pizzas */}
            <section className="container" style={{ padding: '6rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Featured Pizzas</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Handpicked favorites from our chef that are guaranteed to satisfy your cravings.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {featuredPizzas.map((pizza) => (
                        <motion.div
                            key={pizza.id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="glass"
                            style={{ padding: '1rem', borderRadius: 'var(--radius-xl)', position: 'relative' }}
                        >
                            <div style={{ height: '200px', overflow: 'hidden', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
                                <img src={pizza.image} alt={pizza.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem' }}>{pizza.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--secondary)', fontWeight: 700 }}>
                                    <Star size={16} fill="var(--secondary)" />
                                    <span>{pizza.rating}</span>
                                </div>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', height: '3rem', overflow: 'hidden' }}>
                                {pizza.description}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>₹{pizza.price}</span>
                                <button
                                    onClick={() => addToCart(pizza)}
                                    style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <ShoppingBag size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section >
        </motion.div >
    );
};

export default Home;
