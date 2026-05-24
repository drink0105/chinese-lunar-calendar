import React, { useState, useEffect } from 'react';

const PrivacyConsentPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check for both the new key and the old key to avoid re-prompting existing users
    const accepted = localStorage.getItem('privacy_accepted') || localStorage.getItem('lunar-days-consent');
    if (!accepted) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacy_accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#fff',
      borderTop: '2px solid #C0392B',
      padding: '16px',
      zIndex: 99999,
      boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
      maxWidth: '600px',
      margin: '0 auto',
    }}>
      <p style={{
        margin: '0 0 12px 0',
        fontSize: '13px',
        lineHeight: '1.5',
        color: '#333',
      }}>
        Welcome to <strong>LunarDays - Chinese Calendar</strong>. Before continuing, please read our{' '}
        <a
          href="/privacy"
          style={{ color: '#C0392B', textDecoration: 'underline' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        . This app uses cookies and third-party advertising. By tapping Accept you agree to our Privacy Policy and use of cookies.
      </p>
      <button
        onClick={handleAccept}
        style={{
          background: '#C0392B',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '10px 32px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Accept & Continue
      </button>
    </div>
  );
};

export default PrivacyConsentPopup;