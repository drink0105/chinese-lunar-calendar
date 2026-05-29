import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-32">
      <Link 
        to="/settings" 
        className="inline-flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary transition-colors mb-12 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {t('common.back')}
      </Link>

      <div className="max-w-[800px] mx-auto p-6 md:p-10 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-[2rem] shadow-xl border border-border/50">
        <h1 className="text-3xl md:text-4xl font-black text-primary mb-6">{t('privacy.title')}</h1>
        
        <div className="space-y-4 font-medium text-sm md:text-base leading-relaxed">
          <p><strong>{t('privacy.appName')}:</strong> LunarDays - Chinese Calendar</p>
          <p><strong>{t('privacy.developer')}:</strong> App-2-U</p>
          <p><strong>{t('privacy.lastUpdated')}:</strong> {t('privacy.lastUpdatedValue')}</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">{t('privacy.intro').split('.')[0]}</h2>
          <p>{t('privacy.intro')}</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">{t('privacy.infoTitle')}</h2>
          <p>{t('privacy.infoText')}</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>{t('privacy.infoItem1')}</li>
            <li>{t('privacy.infoItem2')}</li>
            <li>{t('privacy.infoItem3')}</li>
            <li>{t('privacy.infoItem4')}</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">{t('privacy.adsTitle')}</h2>
          <p>{t('privacy.adsText')}</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">{t('privacy.cookiesTitle')}</h2>
          <p>{t('privacy.cookiesText')}</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">{t('privacy.useTitle')}</h2>
          <p>{t('privacy.useText')}</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">{t('privacy.retentionTitle')}</h2>
          <p>{t('privacy.retentionText')}</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">{t('privacy.childrenTitle')}</h2>
          <p>{t('privacy.childrenText')}</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">{t('privacy.rightsTitle')}</h2>
          <p>{t('privacy.rightsText')}</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">{t('privacy.changesTitle')}</h2>
          <p>{t('privacy.changesText')}</p>

          <h2 className="text-xl md:text-2xl font-black text-primary mt-8 mb-4">{t('privacy.contactTitle')}</h2>
          <p>{t('privacy.contactText')}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;