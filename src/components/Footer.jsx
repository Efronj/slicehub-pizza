import React from 'react';
import { Link } from 'react-router-dom';
import { Pizza, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--bg-secondary)', padding: '4rem 0 2rem', marginTop: '4rem', borderTop: '1px solid var(--border)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.5rem' }}>
                        <Pizza color="var(--primary)" size={32} />
                        <span className="gradient-text">SliceHub</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        The best pizza in town, delivered fast to your doorstep. Experience the premium taste of SliceHub.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Instagram size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
                        <Twitter size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
                        <Facebook size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
                    </div>
                </div>

                <div>
                    <h4 style={{ marginBottom: '1.5rem' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/#offers">Offers</Link></li>
                        <li><Link to="/admin">Admin Dashboard</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ marginBottom: '1.5rem' }}>Legal</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                        <li style={{ cursor: 'pointer' }}>Terms of Service</li>
                        <li style={{ cursor: 'pointer' }}>Privacy Policy</li>
                        <li style={{ cursor: 'pointer' }}>Cookie Policy</li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ marginBottom: '1.5rem' }}>Contact</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                        <li>123 Pizza Lane, Foodie City</li>
                        <li>+1 (555) 123-4567</li>
                        <li>hello@slicehub.com</li>
                    </ul>
                </div>
            </div>
            <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <p>© {new Date().getFullYear()} SliceHub. All rights reserved.</p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Made with <span style={{ color: 'var(--primary)' }}>❤️</span> by <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Efron</span></p>
            </div>
        </footer>
    );
};

export default Footer;
