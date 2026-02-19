import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingBag, Star } from 'lucide-react';
import { useTheme } from '../App';

const Menu = () => {
    const { addToCart, pizzas } = useTheme();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const categories = ['All', 'Veg', 'Non-Veg', 'Combo', 'Drinks'];

    const filteredPizzas = pizzas.filter((pizza) => {
        const matchesSearch = pizza.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || pizza.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our Delicious <span className="gradient-text">Menu</span></h1>
                <p style={{ color: 'var(--text-secondary)' }}>Choose from our wide variety of artisan pizzas and more.</p>
            </div>

            {/* Filters & Search */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: 'var(--radius-full)',
                                fontWeight: 600,
                                background: category === cat ? 'var(--primary)' : 'var(--bg-secondary)',
                                color: category === cat ? 'white' : 'var(--text-primary)',
                                border: category === cat ? 'none' : '1px solid var(--border)',
                                transition: 'var(--transition)',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div style={{ position: 'relative', minWidth: '300px' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                    <input
                        type="text"
                        placeholder="Search your favorite pizza..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            fontSize: '1rem'
                        }}
                    />
                </div>
            </div>

            {/* Pizza Grid */}
            <motion.div
                layout
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
            >
                <AnimatePresence mode="popLayout">
                    {filteredPizzas.map((pizza) => (
                        <motion.div
                            key={pizza.id}
                            layout
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -10 }}
                            className="glass"
                            style={{ padding: '1rem', borderRadius: 'var(--radius-xl)' }}
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
                                    style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--shadow)' }}
                                >
                                    <ShoppingBag size={20} /> Add
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredPizzas.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <p style={{ fontSize: '1.25rem' }}>No pizzas found matching your search. Try another one!</p>
                </div>
            )}
        </div>
    );
};

export default Menu;
