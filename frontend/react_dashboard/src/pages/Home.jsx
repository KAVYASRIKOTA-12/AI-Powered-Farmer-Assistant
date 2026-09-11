import React, { useState, useEffect } from 'react';
import { CloudSun, Droplets, Thermometer, Wind, AlertTriangle, TrendingUp, Bug, Info } from 'lucide-react';
import api from '../services/api';
import { motion } from 'framer-motion';

const Home = ({ selectedLanguage }) => {
  const [weather, setWeather] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [locationName, setLocationName] = useState("Loading...");

  const t = {
    en: { title: "Farmer's Dashboard", sub: "Real-time insights for your fields.", wStatus: "Weather Status", live: "Live: ", temp: "Temperature", hum: "Humidity", wind: "Wind Speed", alert: "Farming Alert:", actions: "Quick Actions", diag: "Diagnose Crop Health", price: "Price Prediction", schemes: "View New Schemes" },
    te: { title: "రైతు డాష్‌బోర్డ్", sub: "మీ పొలాలకు నిజ-సమయ సూచనలు.", wStatus: "వాతావరణ స్థితి", live: "లైవ్: ", temp: "ఉష్ణోగ్రత", hum: "తేమ", wind: "గాలి వేగం", alert: "వ్యవసాయ హెచ్చరిక:", actions: "త్వరిత చర్యలు", diag: "పంట ఆరోగ్య నిర్ధారణ", price: "ధరల అంచనా", schemes: "కొత్త పథకాలను చూడండి" },
    hi: { title: "किसान का डैशबोर्ड", sub: "आपके खेतों के लिए रीयल-टाइम जानकारी।", wStatus: "मौसम की स्थिति", live: "लाइव: ", temp: "तापमान", hum: "नमी", wind: "हवा की गति", alert: "कृषि अलर्ट:", actions: "त्वरित कार्रवाई", diag: "फसल स्वास्थ्य का निदान", price: "कीमत की भविष्यवाणी", schemes: "नई योजनाएं देखें" },
    ta: { title: "விவசாயி டாஷ்போர்டு", sub: "உங்கள் வயல்களுக்கான நேரடி தரவுகள்.", wStatus: "வானிலை நிலை", live: "லைவ்: ", temp: "வெப்பநிலை", hum: "ஈரப்பதம்", wind: "காற்று வேகம்", alert: "விவசாய எச்சரிக்கை:", actions: "விரைவான செயல்கள்", diag: "பயிர் நலனை கண்டறி", price: "விலை கணிப்பு", schemes: "புதிய திட்டங்களை பார்க்க" },
    kn: { title: "ರೈತರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", sub: "ನಿಮ್ಮ ಹೊಲಗಳಿಗೆ ನೈಜ-ಸಮಯದ ಒಳನೋಟಗಳು.", wStatus: "ಹವಾಮಾನ ಸ್ಥಿತಿ", live: "ಲೈವ್: ", temp: "ತಾಪಮಾನ", hum: "ಆರ್ದ್ರತೆ", wind: "ಗಾಳಿ ವೇಗ", alert: "ಕೃಷಿ ಎಚ್ಚರಿಕೆ:", actions: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು", diag: "ಬೆಳೆ ಆರೋಗ್ಯ ನಿರ್ಣಯ", price: "ಬೆಲೆ ಮುನ್ಸೂಚನೆ", schemes: "ಹೊಸ ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ" },
    ml: { title: "കർഷക ഡാഷ്‌ബോർഡ്", sub: "നിങ്ങളുടെ പാടങ്ങൾക്കായുള്ള തത്സമയ വിവരങ്ങൾ.", wStatus: "കാലാവസ്ഥാ വിവരങ്ങൾ", live: "തത്സമയം: ", temp: "താപനില", hum: "ഈർപ്പം", wind: "കാറ്റിന്റെ വേഗത", alert: "കാർഷിക മുന്നറിയിപ്പ്:", actions: "ദ്രുത പ്രവർത്തനങ്ങൾ", diag: "വിളയുടെ ആരോഗ്യം പരിശോധിക്കുക", price: "വില പ്രവചനം", schemes: "പുതിയ പദ്ധതികൾ കാണുക" },
    mr: { title: "शेतकऱ्यांचा डॅशबोर्ड", sub: "तुमच्या शेतासाठी रिअल-टाइम माहिती.", wStatus: "हवामान स्थिती", live: "थेट: ", temp: "तापमान", hum: "आर्द्रता", wind: "वाऱ्याचा वेग", alert: "शेतीविषयक अलर्ट:", actions: "त्वरित कृती", diag: "पिकांच्या आरोग्याचे निदान", price: "किमतीचा अंदाज", schemes: "नवीन योजना पहा" },
    gu: { title: "ખેડૂતનું ડેશબોર્ડ", sub: "તમારા ખેતરો માટે રીઅલ-ટાઇમ આંતરદૃષ્ટિ.", wStatus: "હવામાનની સ્થિતિ", live: "લાઇવ: ", temp: "તાપમાન", hum: "ભેજ", wind: "પવનની ગતિ", alert: "કૃષિ ચેતવણી:", actions: "ઝડપી ક્રિયાઓ", diag: "પાક આરોગ્ય નિદાન", price: "ભાવની આગાહી", schemes: "નવી યોજનાઓ જુઓ" },
    bn: { title: "কৃষকের ড্যাশবোর্ড", sub: "আপনার ক্ষেতের জন্য রিয়েল-টাইম অন্তর্দৃষ্টি।", wStatus: "আবহাওয়ার অবস্থা", live: "লাইভ: ", temp: "তাপমাত্রা", hum: "আর্দ্রতা", wind: "বাতাসের গতি", alert: "কৃষি সতর্কতা:", actions: "দ্রুত পদক্ষেফ", diag: "ফসলের স্বাস্থ্য নির্ণয় করুন", price: "মূল্য পূর্বাভাস", schemes: "নতুন প্রকল্পগুলি দেখুন" },
    pa: { title: "ਕਿਸਾਨ ਦਾ ਡੈਸ਼ਬੋਰਡ", sub: "ਤੁਹਾਡੇ ਖੇਤਾਂ ਲਈ ਰੀਅਲ-ਟਾਈਮ ਜਾਣਕਾਰੀ।", wStatus: "ਮੌਸਮ ਦੀ ਸਥਿਤੀ", live: "ਲਾਈਵ: ", temp: "ਤਾਪਮਾਨ", hum: "ਨਮੀ", wind: "ਹਵਾ ਦੀ ਗਤੀ", alert: "ਖੇਤੀਬਾੜੀ ਅਲਰਟ:", actions: "ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ", diag: "ਫਸਲ ਦੀ ਸਿਹਤ ਦਾ ਨਿਦਾਨ ਕਰੋ", price: "ਕੀਮਤ ਦੀ ਭਵਿੱਖਬਾਣੀ", schemes: "ਨਵੀਆਂ ਸਕੀਮਾਂ ਦੇਖੋ" }
  };

  const curr = t[selectedLanguage] || t.en;

  useEffect(() => {
    const fetchWeather = async (city) => {
      try {
        const response = await api.get(`/weather/current?city=${city}`);
        setLocationName(city);
        setWeather(response.data.weather);
        setAlerts(response.data.alerts);
      } catch (error) {
        console.error("Error fetching weather", error);
        setLocationName(city);
        setWeather({ temp: 28, humidity: 65, condition: 'Sunny', wind_speed: 12 });
        setAlerts(["High humidity warning - risk of fungal infection for tomatoes."]);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            const city = data.address?.city || data.address?.town || data.address?.county || 'Delhi';
            setLocationName(city);
            
            // Pass lat & lon to avoid 404 city mapping errors in OpenWeather
            const response = await api.get(`/weather/current?city=${city}&lat=${latitude}&lon=${longitude}`);
            setWeather(response.data.weather);
            setAlerts(response.data.alerts);
          } catch (e) {
            console.error("Geocoding failed", e);
            fetchWeather("Ludhiana");
          }
        },
        (error) => {
          console.warn("Geolocation denied or failed.", error);
          fetchWeather("Ludhiana");
        }
      );
    } else {
      fetchWeather("Ludhiana");
    }
  }, []);

  return (
    <div className="home-dashboard">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '30px' }}
      >
        <h1>{curr.title}</h1>
        <p style={{ color: '#666' }}>{curr.sub}</p>
      </motion.div>

      <div className="dashboard-grid">
        {/* Weather Card */}
        <div className="glass-card" style={{ padding: '24px', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CloudSun color="#2e7d32" /> {curr.wStatus}</h2>
            <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '5px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>{curr.live}{locationName}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <Thermometer size={32} color="#f44336" />
              <div style={statValueStyle}>{weather?.temp}°C</div>
              <div style={statLabelStyle}>{curr.temp}</div>
            </div>
            <div>
              <Droplets size={32} color="#2196f3" />
              <div style={statValueStyle}>{weather?.humidity}%</div>
              <div style={statLabelStyle}>{curr.hum}</div>
            </div>
            <div>
              <Wind size={32} color="#9e9e9e" />
              <div style={statValueStyle}>{weather?.wind_speed} km/h</div>
              <div style={statLabelStyle}>{curr.wind}</div>
            </div>
          </div>

          {alerts.length > 0 && (
            <div style={alertBoxStyle}>
              <AlertTriangle size={20} />
              <div>
                <strong>{curr.alert}</strong> {alerts[0]}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h2 style={{ marginBottom: '20px' }}>{curr.actions}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button className="premium-button"><Bug size={18} /> {curr.diag}</button>
            <button className="premium-button" style={{ background: '#fbc02d', color: '#1b5e20' }}><TrendingUp size={18} /> {curr.price}</button>
            <button className="premium-button" style={{ background: '#2196f3' }}><Info size={18} /> {curr.schemes}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const statValueStyle = {
  fontSize: '24px',
  fontWeight: '700',
  marginTop: '10px'
};

const statLabelStyle = {
  fontSize: '14px',
  color: '#666',
  marginTop: '5px'
};

const alertBoxStyle = {
  marginTop: '24px',
  padding: '15px',
  background: '#fff3e0',
  borderLeft: '5px solid #ff9800',
  borderRadius: '8px',
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
  color: '#e65100'
};

export default Home;
