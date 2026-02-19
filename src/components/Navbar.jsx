import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sun, Moon, Pizza, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../App';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode, toggleTheme, cart, setIsCartOpen, currentUser, logoutUser } = useTheme();
    const location = useLocation();

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
    ];

    if (currentUser) {
        navLinks.push({ name: 'History', path: '/history' });
    }

    return (
        <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '1rem 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 800 }}>
                    <Pizza color="var(--primary)" size={32} />
                    <span className="gradient-text">SliceHub</span>
                </Link>

                {/* Desktop Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                style={{
                                    fontWeight: 500,
                                    color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-primary)',
                                    transition: 'var(--transition)',
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            onClick={toggleTheme}
                            style={{ padding: '0.5rem', background: 'none', color: 'var(--text-primary)', border: 'none', cursor: 'pointer' }}
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            style={{ position: 'relative', background: 'none', border: 'none', padding: '0.5rem', color: 'var(--text-primary)', cursor: 'pointer' }}
                        >
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span style={{ position: 'absolute', top: '0', right: '0', background: 'var(--primary)', color: 'white', fontSize: '0.7rem', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <div className="nav-links">
                            {currentUser ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                        <User size={20} />
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{currentUser.name.split(' ')[0]}</span>
                                    </div>
                                    <button
                                        onClick={logoutUser}
                                        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0.5rem' }}
                                        title="Logout"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="gradient-btn"
                                    style={{
                                        padding: '0.6rem 1.25rem',
                                        borderRadius: 'var(--radius-full)',
                                        color: 'white',
                                        fontSize: '0.9rem',
                                        fontWeight: 700,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        <button
                            className="mobile-toggle"
                            onClick={() => setIsOpen(!isOpen)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', display: 'none' }}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="glass"
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '280px',
                            zIndex: 1001,
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="gradient-text" style={{ fontWeight: 800, fontSize: '1.2rem' }}>Menu</span>
                            <button onClick={() => setIsOpen(false)} style={{ background: 'none', color: 'var(--text-primary)' }}><X size={24} /></button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    style={{ fontSize: '1.2rem', fontWeight: 600, color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-primary)' }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                            {currentUser ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '50%' }}><User size={20} /></div>
                                        <span style={{ fontWeight: 700 }}>{currentUser.name}</span>
                                    </div>
                                    <button
                                        onClick={() => { logoutUser(); setIsOpen(false); }}
                                        style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', background: 'var(--bg-secondary)', color: 'var(--primary)', fontWeight: 700 }}
                                    >
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="gradient-btn"
                                    style={{ display: 'block', textAlign: 'center', padding: '1rem', borderRadius: 'var(--radius-full)', color: 'white', fontWeight: 700 }}
                                >
                                    Login / Sign Up
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    .nav-links { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
