import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mocking an authentication delay
    setTimeout(() => {
      setLoading(false);
      onLogin(); 
    }, 1500);
  };

  return (
    <div style={containerStyle}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card" 
        style={authCardStyle}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div className="logo" style={{ justifyContent: 'center', marginBottom: '10px', fontSize: '32px' }}>
            <Sprout size={40} color="#059669" />
            <span>AgriAI</span>
          </div>
          <p style={{ color: 'var(--text-light)' }}>
            {isLogin ? 'Welcome back! Log in to your farm dashboard.' : 'Join us to revolutionize your farming experience.'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.form 
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {!isLogin && (
              <div style={inputWrapperStyle}>
                <User size={20} color="#059669" style={iconStyle} />
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Full Name" 
                  required 
                  value={formData.name} 
                  onChange={handleChange} 
                  style={inputStyle} 
                />
              </div>
            )}
            
            <div style={inputWrapperStyle}>
              <Mail size={20} color="#059669" style={iconStyle} />
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                required 
                value={formData.email} 
                onChange={handleChange} 
                style={inputStyle} 
              />
            </div>

            <div style={inputWrapperStyle}>
              <Lock size={20} color="#059669" style={iconStyle} />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                required 
                value={formData.password} 
                onChange={handleChange} 
                style={inputStyle} 
              />
            </div>

            <button type="submit" className="premium-button" style={{ justifyContent: 'center', marginTop: '10px' }} disabled={loading}>
              {loading ? <div className="spin"><Sprout size={20}/></div> : (isLogin ? <ArrowRight size={20}/> : <CheckCircle size={20}/>)}
              {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </motion.form>
        </AnimatePresence>

        <div style={{ textAlign: 'center', marginTop: '30px', color: 'var(--text-light)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isLogin ? 'Sign up here' : 'Log in here'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
};

const authCardStyle = {
  width: '100%',
  maxWidth: '450px',
  padding: '50px 40px',
  background: 'rgba(255, 255, 255, 0.85)',
  boxShadow: '0 25px 50px -12px rgba(5, 150, 105, 0.25)'
};

const inputWrapperStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
};

const iconStyle = {
  position: 'absolute',
  left: '16px'
};

const inputStyle = {
  width: '100%',
  padding: '16px 16px 16px 48px',
  borderRadius: '16px',
  border: '1px solid rgba(16, 185, 129, 0.3)',
  fontSize: '1rem',
  background: 'rgba(255, 255, 255, 0.9)',
  outline: 'none',
  transition: 'all 0.3s ease',
  color: '#334155'
};

export default Auth;
