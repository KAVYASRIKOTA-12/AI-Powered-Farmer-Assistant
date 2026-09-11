import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import DiseaseDetection from './pages/DiseaseDetection';
import MandiPrices from './pages/MandiPrices';
import GovernmentSchemes from './pages/GovernmentSchemes';
import CropRecommendation from './pages/CropRecommendation';
import Auth from './pages/Auth';
import ChatAssistant from './components/ChatAssistant';
import { Sprout, CloudSun, LayoutDashboard, Bug, TrendingUp, Info, Languages } from 'lucide-react';

function App() {
  const [language, setLanguage] = useState('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'mr', name: 'మరాఠీ' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' }
  ];

  const t = {
    en: { dash: "Dashboard", health: "Crop Health", prices: "Mandi Prices", rec: "Recommend Crop", schemes: "Schemes", welcome: "Welcome, Farmer!", logout: "Logout" },
    te: { dash: "డాష్‌బోర్డ్", health: "పంట ఆరోగ్యము", prices: "మండి ధరలు", rec: "పంట సూచన", schemes: "పథకాలు", welcome: "స్వాగతం, రైతా!", logout: "లాగ్ అవుట్" },
    hi: { dash: "डैशबोर्ड", health: "फसल स्वास्थ्य", prices: "मंडी की कीमतें", rec: "फसल की सिफारिश", schemes: "योजनाएं", welcome: "स्वागत है, किसान!", logout: "लॉग आउट" },
    ta: { dash: "கட்டுப்பாட்டு அறை", health: "பயிர் நலம்", prices: "மண்டி விலைகள்", rec: "பயிர் பரிந்துரை", schemes: "திட்டங்கள்", welcome: "நல்வரவு, விவசாயியே!", logout: "வெளியேறு" },
    kn: { dash: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", health: "ಬೆಳೆ ಆರೋಗ್ಯ", prices: "ಮಂಡಿ ಬೆಲೆಗಳು", rec: "ಬೆಳೆ ಶಿಫಾರಸು", schemes: "ಯೋಜನೆಗಳು", welcome: "ಸ್ವಾಗತ, ರೈತರೆ!", logout: "ಲಾಗ್ ಔಟ್" },
    ml: { dash: "ഡാഷ്‌ബോർഡ്", health: "വിള ആരോഗ്യം", prices: "മണ്ഡി വിലകൾ", rec: "വിള ശുപാർശ", schemes: "പദ്ധതികൾ", welcome: "സ്വാഗതം, കർഷകരെ!", logout: "ലോഗ് ഔട്ട്" },
    mr: { dash: "डॅशबोर्ड", health: "पीक आरोग्य", prices: "मंडी दर", rec: "पीक शिफारस", schemes: "योजना", welcome: "स्वागत आहे, शेतकरी!", logout: "लॉगआउट" },
    gu: { dash: "ડેશબોર્ડ", health: "પાક આરોગ્ય", prices: "મંડીના ભાવો", rec: "પાક ભલામણ", schemes: "યોજનાઓ", welcome: "સ્વાગત છે, ખેડૂત!", logout: "લૉગઆઉટ" },
    bn: { dash: "ড্যাশবোর্ড", health: "ফসলের স্বাস্থ্য", prices: "মন্ডি মূল্য", rec: "ফসল সুপারিশ", schemes: "প্রকল্প", welcome: "স্বাগতম, কৃষক!", logout: "লগআউট" },
    pa: { dash: "ਡੈਸ਼ਬੋਰਡ", health: "ਫਸਲ ਦੀ ਸਿਹਤ", prices: "ਮੰਡੀ ਦੀਆਂ ਕੀਮਤਾਂ", rec: "ਫਸਲ ਦੀ ਸਿਫਾਰਸ਼", schemes: "ਸਕੀਮਾਂ", welcome: "ਸਵਾਗਤ ਹੈ, ਕਿਸਾਨ!", logout: "ਲਾਗ ਆਊਟ" }
  };

  const currentT = t[language] || t.en;

  return (
    <div className="app-container">
      <header>
        <div className="logo">
          <Sprout size={32} />
          <span>AgriAI Assistant</span>
        </div>
        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/" style={navLinkStyle}><LayoutDashboard size={20} /> {currentT.dash}</Link>
          <Link to="/disease" style={navLinkStyle}><Bug size={20} /> {currentT.health}</Link>
          <Link to="/prices" style={navLinkStyle}><TrendingUp size={20} /> {currentT.prices}</Link>
          <Link to="/recommend" style={navLinkStyle}><Sprout size={20} /> {currentT.rec}</Link>
          <Link to="/schemes" style={navLinkStyle}><Info size={20} /> {currentT.schemes}</Link>
          
          <div className="lang-selector" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#e8f5e9', padding: '5px 15px', borderRadius: '20px' }}>
            <Languages size={18} color="#2e7d32" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#2e7d32', fontWeight: 'bold', outline: 'none', cursor: 'pointer' }}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
        </nav>
        <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontWeight: '600' }}>{currentT.welcome}</span>
          <button 
            onClick={() => setIsAuthenticated(false)}
            style={{ background: 'rgba(244, 67, 54, 0.1)', color: '#d32f2f', border: '1px solid rgba(244, 67, 54, 0.3)', padding: '6px 14px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s ease' }}
            onMouseOver={(e) => {e.target.style.background = '#f44336'; e.target.style.color = 'white'}}
            onMouseOut={(e) => {e.target.style.background = 'rgba(244, 67, 54, 0.1)'; e.target.style.color = '#d32f2f'}}
          >
            {currentT.logout}
          </button>
        </div>
      </header>

      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home selectedLanguage={language} />} />
          <Route path="/disease" element={<DiseaseDetection selectedLanguage={language} />} />
          <Route path="/prices" element={<MandiPrices selectedLanguage={language} />} />
          <Route path="/recommend" element={<CropRecommendation selectedLanguage={language} />} />
          <Route path="/schemes" element={<GovernmentSchemes selectedLanguage={language} />} />
        </Routes>
      </main>

      <ChatAssistant selectedLanguage={language} />
    </div>
  );
}

const navLinkStyle = {
  textDecoration: 'none',
  color: '#1b5e20',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'color 0.3s'
};

export default App;
