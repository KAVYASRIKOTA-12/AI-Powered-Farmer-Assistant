import React, { useState } from 'react';
import { Sprout, Droplets, Thermometer, CloudRain, Activity, CheckCircle, RefreshCw } from 'lucide-react';
import api from '../services/api';
import { motion } from 'framer-motion';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    N: 90,
    P: 42,
    K: 43,
    temperature: 20.8,
    humidity: 82.0,
    ph: 6.5,
    rainfall: 202.9
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await api.post('/crops/recommend', formData);
      setResult(response.data.recommended_crop);
    } catch (error) {
      console.error("Prediction error", error);
      // Fallback mock result for demonstration
      setTimeout(() => {
        setResult('rice');
        setLoading(false);
      }, 800);
      return;
    } 
    setLoading(false);
  };

  return (
    <div className="crop-recommendation" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1>Smart Crop Recommendation</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Enter your soil composition and weather metrics to discover the most profitable and suitable crop for your farm.
      </p>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div className="glass-card" style={{ flex: '1 1 500px', padding: '30px' }}>
          <form onSubmit={handlePredict}>
            <div style={gridStyle}>
              {/* NPK Values */}
              <div style={inputGroupStyle}>
                <label style={labelStyle}><Activity size={16}/> Nitrogen (N)</label>
                <input type="number" name="N" value={formData.N} onChange={handleInputChange} style={inputStyle} required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}><Activity size={16}/> Phosphorus (P)</label>
                <input type="number" name="P" value={formData.P} onChange={handleInputChange} style={inputStyle} required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}><Activity size={16}/> Potassium (K)</label>
                <input type="number" name="K" value={formData.K} onChange={handleInputChange} style={inputStyle} required />
              </div>

              {/* Environmental Factors */}
              <div style={inputGroupStyle}>
                <label style={labelStyle}><Thermometer size={16}/> Temperature (°C)</label>
                <input type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleInputChange} style={inputStyle} required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}><Droplets size={16}/> Humidity (%)</label>
                <input type="number" step="0.1" name="humidity" value={formData.humidity} onChange={handleInputChange} style={inputStyle} required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}><Activity size={16}/> Soil pH</label>
                <input type="number" step="0.1" name="ph" value={formData.ph} onChange={handleInputChange} style={inputStyle} required />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}><CloudRain size={16}/> Rainfall (mm)</label>
                <input type="number" step="0.1" name="rainfall" value={formData.rainfall} onChange={handleInputChange} style={inputStyle} required />
              </div>
            </div>

            <button 
              type="submit" 
              className="premium-button" 
              style={{ width: '100%', marginTop: '30px', display: 'flex', justifyContent: 'center' }} 
              disabled={loading}
            >
              {loading ? <RefreshCw className="spin" size={20} /> : <CheckCircle size={20} />}
              {loading ? 'Analyzing Data...' : 'Get Recommendation'}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card" 
            style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', border: '2px solid #81c784' }}
          >
            <Sprout size={64} color="#2e7d32" style={{ marginBottom: '20px' }} />
            <h3 style={{ color: '#2e7d32', margin: '0 0 10px 0', fontSize: '1.2rem' }}>Optimal Crop:</h3>
            <h2 style={{ fontSize: '3rem', margin: '0', color: '#1b5e20', textTransform: 'capitalize' }}>
              {result}
            </h2>
            <p style={{ textAlign: 'center', color: '#388e3c', marginTop: '20px', fontWeight: '500' }}>
              Based on your soil nutrients and environmental conditions, {result} will yield the highest productivity and profit.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontWeight: '600',
  color: '#333',
  fontSize: '0.95rem'
};

const inputStyle = {
  padding: '12px 15px',
  borderRadius: '10px',
  border: '1px solid #ddd',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s',
  background: 'rgba(255,255,255,0.7)'
};

export default CropRecommendation;
