import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { useTheme } from '../App';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginUser, signupUser, isDarkMode } = useTheme();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            const success = loginUser(formData.email, formData.password);
            if (success) {
                navigate('/');
            } else {
                setError('Invalid email or password.');
            }
        } else {
            if (!formData.name) return setError('Please enter your name.');
            signupUser(formData);
            navigate('/');
        }
    };

    return (
        <div className="container" style={{ padding: '6rem 0', display: 'flex', justifyContent: 'center', minHeight: '80vh' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{
                    padding: '3rem',
                    borderRadius: 'var(--radius-xl)',
                    maxWidth: '450px',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative background gradients */}
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '200px', height: '200px', background: 'var(--primary)', filter: 'blur(80px)', opacity: 0.2, borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '200px', height: '200px', background: 'var(--secondary)', filter: 'blur(80px)', opacity: 0.2, borderRadius: '50%' }}></div>

                <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative' }}>
                    <div style={{ background: 'var(--bg-secondary)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid var(--border)' }}>
                        {isLogin ? <LogIn size={32} color="var(--primary)" /> : <UserPlus size={32} color="var(--primary)" />}
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{isLogin ? 'Welcome Back' : 'Join SliceHub'}</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{isLogin ? 'Login to track your delicious orders.' : 'Create an account for a better experience.'}</p>
                </div>

                <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ marginBottom: '1.5rem', overflow: 'hidden' }}
                            >
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                required
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                            />
                        </div>
                    </div>

                    {error && <p style={{ color: 'var(--primary)', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</p>}

                    <button
                        type="submit"
                        className="gradient-btn"
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            borderRadius: 'var(--radius-full)',
                            color: 'white',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            marginBottom: '2rem'
                        }}
                    >
                        {isLogin ? 'Login Now' : 'Create Account'}
                        <ArrowRight size={20} />
                    </button>
                </form>

                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            style={{ background: 'none', color: 'var(--primary)', border: 'none', fontWeight: 700, marginLeft: '0.5rem', cursor: 'pointer' }}
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
