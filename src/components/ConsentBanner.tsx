import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const ConsentBanner = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lunar-days-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lunar-days-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-20 left-4 right-4 bg-white shadow-2xl border border-gray-200 p-4 rounded-xl z-[60] flex flex-col gap-3"
        >
          <p className="text-sm text-gray-600 leading-tight">
            {t('consent.message')}
          </p>
          <Button 
            onClick={handleAccept}
            className="bg-[#C0392B] hover:bg-[#A93226] text-white w-full rounded-lg"
          >
            {t('consent.accept')}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsentBanner;