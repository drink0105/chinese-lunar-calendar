import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConsent } from '../hooks/useConsent';

const PrivacyConsentPopup: React.FC = () => {
  const { consent, accept, decline } = useConsent();
  const { t } = useTranslation();

  if (consent !== 'pending') return null;

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
        lineHeight: '1.6',
        color: '#333',
      }}>
        {t('consent.message')}{' '}
        <a
          href="/privacy"
          style={{ color: '#C0392B', textDecoration: 'underline' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('consent.privacyLink')}
        </a>
        {'. '}{t('consent.cookieNote')}
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={accept}
          style={{
            flex: 1,
            background: '#C0392B',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {t('consent.accept')}
        </button>
        <button
          onClick={decline}
          style={{
            flex: 1,
            background: '#fff',
            color: '#C0392B',
            border: '2px solid #C0392B',
            borderRadius: '6px',
            padding: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {t('consent.decline')}
        </button>
      </div>
    </div>
  );
};

export default PrivacyConsentPopup;