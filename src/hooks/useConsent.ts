import { useState, useEffect } from 'react';

export type ConsentStatus = 'pending' | 'accepted' | 'declined';

export function useConsent() {
  const [consent, setConsent] = useState<ConsentStatus>('pending');

  useEffect(() => {
    const stored = localStorage.getItem('user_consent');
    const oldKey = localStorage.getItem('privacy_accepted');
    if (stored === 'accepted' || oldKey === 'true') {
      if (oldKey === 'true' && !stored) {
        localStorage.setItem('user_consent', 'accepted');
      }
      setConsent('accepted');
    } else if (stored === 'declined') {
      setConsent('declined');
    } else {
      setConsent('pending');
    }
  }, []);

  const accept = () => {
    localStorage.setItem('user_consent', 'accepted');
    setConsent('accepted');
  };

  const decline = () => {
    localStorage.setItem('user_consent', 'declined');
    setConsent('declined');
  };

  return { consent, accept, decline };
}