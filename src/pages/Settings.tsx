import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Languages, Palette, Info, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh-CN', name: '简体中文' },
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'th', name: 'ไทย' },
    { code: 'vi', name: 'Tiếng Việt' },
  ];

  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-3xl font-bold text-[#C0392B] dark:text-red-500 mb-8 text-center">
          {t('nav.settings', 'Settings')}
        </h1>

        <section className="space-y-3">
          <h2 className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-2 flex items-center gap-2">
            <Palette size={14} /> {t('settings.appearance', 'Appearance')}
          </h2>
          <Card className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 shadow-xl overflow-hidden">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                  {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
                </div>
                <div>
                  <p className="font-bold text-gray-800 dark:text-zinc-200">{t('settings.theme', 'Theme Mode')}</p>
                  <p className="text-xs text-gray-500 dark:text-zinc-500 capitalize">{theme}</p>
                </div>
              </div>
              <Button 
                onClick={toggleTheme}
                variant="outline"
                className="rounded-full w-12 h-12 p-0 border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-2 flex items-center gap-2">
            <Languages size={14} /> {t('settings.language', 'Language')}
          </h2>
          <Card className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 shadow-xl">
            <CardContent className="p-2 grid grid-cols-1 divide-y divide-gray-100 dark:divide-zinc-800">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800/50 ${
                    i18n.language === lang.code ? 'text-[#C0392B] dark:text-red-500 font-bold' : 'text-gray-700 dark:text-zinc-300'
                  }`}
                >
                  <span>{lang.name}</span>
                  {i18n.language === lang.code && <div className="w-2 h-2 bg-[#C0392B] dark:bg-red-500 rounded-full shadow-[0_0_8px] shadow-red-500" />}
                </button>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-2 flex items-center gap-2">
            <Info size={14} /> {t('settings.about', 'About')}
          </h2>
          <Card className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 shadow-xl">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 dark:text-zinc-200">Version 1.2.0</p>
                  <p className="text-xs text-gray-500 dark:text-zinc-500">Premium Edition</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                LunarDays is a premium Chinese Lunar Calendar application designed for modern users who value tradition and aesthetics.
              </p>
            </CardContent>
          </Card>
        </section>
      </motion.div>
    </div>
  );
};

export default Settings;