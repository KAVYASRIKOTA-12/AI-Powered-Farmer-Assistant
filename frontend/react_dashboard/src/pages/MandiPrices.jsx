import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, IndianRupee } from 'lucide-react';
import api from '../services/api';

const MandiPrices = () => {
  const [prices, setPrices] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await api.get('/mandi');
        setPrices(response.data);
      } catch (error) {
        console.error("Error fetching prices", error);
        // Fallback mock data
        setPrices([
          { market: 'Ludhiana', commodity: 'Wheat', state: 'Punjab', district: 'Ludhiana', max_price: 2450, arrival_date: '10/03/2026' },
          { market: 'Amritsar', commodity: 'Rice', state: 'Punjab', district: 'Amritsar', max_price: 3800, arrival_date: '10/03/2026' },
          { market: 'Barnala', commodity: 'Tomato', state: 'Punjab', district: 'Barnala', max_price: 1500, arrival_date: '11/03/2026' },
          { market: 'Bathinda', commodity: 'Potato', state: 'Punjab', district: 'Bathinda', max_price: 1200, arrival_date: '11/03/2026' }
        ]);
      }
    };
    fetchPrices();
  }, []);

  const filteredPrices = prices.filter(p => 
    p.commodity.toLowerCase().includes(filter.toLowerCase()) || 
    p.market.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="mandi-prices">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1>Live Mandi Prices</h1>
          <p style={{ color: '#666' }}>Current market rates across different locations.</p>
        </div>
        <div style={searchContainerStyle}>
          <Search size={18} color="#666" />
          <input 
            type="text" 
            placeholder="Search crop or market..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={searchInputStyle}
          />
        </div>
      </div>

      <div className="price-grid" style={gridStyle}>
        {filteredPrices.map((item, idx) => (
          <div key={idx} className="glass-card" style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={commodityTagStyle}>{item.commodity}</span>
              <span style={dateStyle}>{item.arrival_date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <MapPin size={16} color="#666" />
              <span style={{ fontWeight: '600' }}>{item.market}, {item.district}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <IndianRupee size={20} color="#2e7d32" />
              <span style={priceValueStyle}>{item.max_price}</span>
              <span style={{ fontSize: '14px', color: '#666' }}>/ quintal (Max)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const searchContainerStyle = {
  background: 'white',
  padding: '10px 20px',
  borderRadius: '25px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  border: '1px solid #eee'
};

const searchInputStyle = {
  border: 'none',
  outline: 'none',
  fontSize: '16px',
  width: '250px'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '20px'
};

const cardStyle = {
  padding: '20px',
  borderTop: '5px solid #2e7d32',
  transition: 'transform 0.3s'
};

const commodityTagStyle = {
  background: '#e8f5e9',
  color: '#2e7d32',
  padding: '4px 12px',
  borderRadius: '15px',
  fontSize: '14px',
  fontWeight: 'bold'
};

const dateStyle = {
  fontSize: '12px',
  color: '#999'
};

const priceValueStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#2e7d32'
};

export default MandiPrices;
