import React, { useState, useEffect } from 'react';
import { Info, ExternalLink, Filter, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

const GovernmentSchemes = ({ selectedLanguage }) => {
  const [schemes, setSchemes] = useState([]);

  const t = {
    en: { title: "Government Agriculture Schemes", sub: "Explore active financial and support programs for farmers.", el: "Eligibility:", apply: "Apply Now" },
    te: { title: "ప్రభుత్వ వ్యవసాయ పథకాలు", sub: "రైతుల కోసం ఆర్థిక మరియు మద్దతు కార్యక్రమాలను విశ్లేషించండి.", el: "అర్హత:", apply: "ఇప్పుడే దరఖాస్తు చేయండి" },
    hi: { title: "सरकारी कृषि योजनाएं", sub: "किसानों के लिए सक्रिय वित्तीय कार्यक्रमों का अन्वेषण करें।", el: "पात्रता:", apply: "अभी आवेदन करें" },
    ta: { title: "அரசு விவசாய திட்டங்கள்", sub: "விவசாயிகளுக்கான நிதி திட்டங்களை ஆராயுங்கள்.", el: "தகுதி:", apply: "விண்ணப்பிக்கவும்" },
    kn: { title: "ಸರ್ಕಾರಿ ಕೃಷಿ ಯೋಜನೆಗಳು", sub: "ರೈತರಿಗೆ ಆರ್ಥಿಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.", el: "ಅರ್ಹತೆ:", apply: "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" },
    ml: { title: "സർക്കാർ കർഷക പദ്ധതികൾ", sub: "കർഷകർക്കായുള്ള സാമ്പത്തിക പരിപാടികൾ പര്യവേക്ഷണം ചെയ്യുക.", el: "യോഗ്യത:", apply: "അപേക്ഷിക്കുക" },
    mr: { title: "सरकारी कृषी योजना", sub: "शेतकऱ्यांसाठी सक्रिय आर्थिक कार्यक्रम एक्सप्लोर करा.", el: "पात्रता:", apply: "अर्ज करा" },
    gu: { title: "સરકારી કૃષિ યોજનાઓ", sub: "ખેડૂતો માટે સક્રિય નાણાકીય કાર્યક્રમોનું અન્વેષણ કરો.", el: "પાત્રતા:", apply: "અરજી કરો" },
    bn: { title: "সরকারি কৃষি প্রকল্প", sub: "কৃষকদের জন্য সক্রিয় আর্থিক প্রোগ্রাম অন্বেষণ করুন।", el: "যোগ্যতা:", apply: "আবেদন করুন" },
    pa: { title: "ਸਰਕਾਰੀ ਖੇਤੀਬਾੜੀ ਸਕੀਮਾਂ", sub: "ਕਿਸਾਨਾਂ ਲਈ ਸਰਗਰਮ ਵਿੱਤੀ ਪ੍ਰੋਗਰਾਮਾਂ ਦੀ ਪੜਚੋਲ ਕਰੋ।", el: "ਯੋਗਤਾ:", apply: "ਅਪਲਾਈ ਕਰੋ" }
  };
  
  const curr = t[selectedLanguage] || t.en;

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await api.get('/schemes');
        setSchemes(response.data);
      } catch (error) {
        console.error("Error fetching schemes", error);
        // Fallback mock data
        setSchemes([
          { 
            name: 'PM-KISAN', 
            description: 'Income support of ₹6,000 per year in three equal installments.', 
            eligibility: 'All small and marginal landholding farmer families.', 
            link: 'https://pmkisan.gov.in/' 
          },
          { 
            name: 'Kisan Credit Card (KCC)', 
            description: 'Provides adequate and timely credit support from the banking system.', 
            eligibility: 'All farmers - individuals/joint borrowers who are owner cultivators.', 
            link: 'https://www.myscheme.gov.in/schemes/kcc' 
          },
          { 
            name: 'PM Fasal Bima Yojana', 
            description: 'Crop insurance scheme for farmers against non-preventable natural risks.', 
            eligibility: 'All farmers including sharecroppers and tenant farmers.', 
            link: 'https://pmfby.gov.in/' 
          }
        ]);
      }
    };
    fetchSchemes();
  }, []);

  return (
    <div className="schemes-page">
      <h1>{curr.title}</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>{curr.sub}</p>

      <div style={{ display: 'grid', gap: '20px' }}>
        {schemes.map((scheme, idx) => (
          <div key={idx} className="glass-card" style={schemeCardStyle}>
            <div style={{ flex: 1 }}>
              <h2 style={{ color: '#2e7d32', marginBottom: '10px' }}>{scheme.name}</h2>
              <p style={{ marginBottom: '15px', color: '#333' }}>{scheme.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
                <CheckCircle2 size={16} color="#4caf50" />
                <strong>{curr.el}</strong> {scheme.eligibility}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <a 
                href={scheme.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={applyButtonStyle}
              >
                {curr.apply} <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const schemeCardStyle = {
  padding: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '40px',
  borderLeft: '10px solid #2e7d32'
};

const applyButtonStyle = {
  background: '#2e7d32',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '12px',
  textDecoration: 'none',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  transition: 'transform 0.3s'
};

export default GovernmentSchemes;
