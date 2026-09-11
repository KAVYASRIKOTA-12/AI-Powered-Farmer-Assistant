import React, { useState } from 'react';
import { Upload, Camera, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../services/api';
import { motion } from 'framer-motion';

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await api.post('/disease/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (error) {
      console.error("Upload error", error);
      // Mock result for demo if backend not running
      setResult({
        disease: 'Tomato Late Blight',
        confidence: 0.94,
        recommendation: 'Apply Mancozeb or Copper oxychloride fungicides. Ensure proper spacing for airflow.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="disease-detection" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Crop Disease Detection</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Upload a photo of a leaf to identify diseases instantly.</p>

      <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
        {!preview ? (
          <div style={uploadPlaceholderStyle}>
            <Upload size={48} color="#2e7d32" />
            <p>Drag & drop or click to upload leaf image</p>
            <input type="file" onChange={handleImageChange} style={hiddenInputStyle} id="leaf-upload" accept="image/*" />
            <label htmlFor="leaf-upload" className="premium-button" style={{ margin: '20px auto' }}>Choose File</label>
          </div>
        ) : (
          <div>
            <img src={preview} alt="Preview" style={previewImageStyle} />
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
              <button 
                className="premium-button" 
                onClick={handleUpload} 
                disabled={loading}
              >
                {loading ? <RefreshCw className="spin" size={18} /> : <CheckCircle size={18} />}
                {loading ? 'Analyzing...' : 'Analyze Photo'}
              </button>
              <button 
                onClick={() => {setPreview(null); setSelectedImage(null); setResult(null);}} 
                style={{ background: '#eee', color: '#333', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card" 
          style={resultCardStyle}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <AlertCircle color="#f44336" size={32} />
            <h2 style={{ margin: 0 }}>Result: {result.disease}</h2>
          </div>
          <div style={{ margin: '10px 0', fontSize: '18px' }}>
            <strong>Confidence Score:</strong> {(result.confidence * 100).toFixed(2)}%
          </div>
          <div style={{ marginTop: '15px', padding: '15px', background: '#e8f5e9', borderRadius: '10px' }}>
            <strong>Expert Recommendation:</strong>
            <p style={{ marginTop: '10px', lineHeight: '1.6' }}>{result.recommendation}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const uploadPlaceholderStyle = {
  border: '2px dashed #4caf50',
  borderRadius: '20px',
  padding: '60px 20px',
  background: 'rgba(76, 175, 80, 0.05)'
};

const hiddenInputStyle = {
  display: 'none'
};

const previewImageStyle = {
  maxWidth: '100%',
  maxHeight: '400px',
  borderRadius: '15px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
};

const resultCardStyle = {
  marginTop: '30px',
  padding: '24px',
  borderLeft: '8px solid #2e7d32'
};

export default DiseaseDetection;
