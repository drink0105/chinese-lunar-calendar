import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Lock, Eye, Globe, Mail } from 'lucide-react';
import BannerAd from '../components/BannerAd';

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-2xl border border-white/20 dark:border-zinc-800/50"
      >
        <header className="mb-12 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight tracking-tight">
            {t('privacy.title')}
          </h1>
          <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">
            {t('privacy.last_updated')}
          </p>
        </header>

        <div className="space-y-12 text-foreground/80 font-medium leading-relaxed">
          <section>
            <p>{t('privacy.intro')}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-primary flex items-center gap-3">
              <Eye size={24} /> {t('privacy.data_collection')}
            </h2>
            <p>{t('privacy.data_desc')}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-primary flex items-center gap-3">
              <Globe size={24} /> {t('privacy.ads')}
            </h2>
            <p>{t('privacy.ads_desc')}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-primary flex items-center gap-3">
              <Lock size={24} /> {t('privacy.cookies')}
            </h2>
            <p>{t('privacy.cookies_desc')}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-primary flex items-center gap-3">
              <Mail size={24} /> {t('privacy.contact')}
            </h2>
            <p>{t('privacy.contact_desc')}</p>
          </section>
        </div>

        <BannerAd />
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;