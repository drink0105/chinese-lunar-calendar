import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeType } from '@/hooks/use-theme';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Info, ShieldCheck, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const themes: { id: ThemeType; name: string; colors: string[] }[] = [
    { id: 'classic', name: 'Classic', colors: ['bg-[#C0392B]', 'bg-[#F39C12]'] },
    { id: 'spring', name: 'Spring Festival', colors: ['bg-[#E74C3C]', 'bg-[#F1C40F]'] },
    { id: 'dragonboat', name: 'Dragon Boat', colors: ['bg-[#27AE60]', 'bg-[#C0392B]'] },
    { id: 'midautumn', name: 'Mid-Autumn', colors: ['bg-[#F39C12]', 'bg-[#922B21]'] },
    { id: 'dark', name: 'Dark Night', colors: ['bg-[#1A1A1A]', 'bg-[#C0392B]'] },
  ];

  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-black text-primary mb-8 text-center tracking-tight">
          {t('nav.settings', 'Settings')}
        </h1>

        <section className="space-y-4">
          <h2 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] px-2 flex items-center gap-2">
            <Palette size={14} /> {t('settings.theme', 'App Theme')}
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`relative group overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                  theme === t.id 
                    ? 'border-primary shadow-lg shadow-primary/10 scale-[1.02]' 
                    : 'border-border hover:border-primary/30 bg-card/50'
                }`}
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {t.colors.map((c, i) => (
                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-background ${c}`} />
                      ))}
                    </div>
                    <span className={`font-bold ${theme === t.id ? 'text-primary' : 'text-foreground/70'}`}>
                      {t.name}
                    </span>
                  </div>
                  {theme === t.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] px-2 flex items-center gap-2">
            <Info size={14} /> {t('settings.about', 'About')}
          </h2>
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-xl rounded-[2rem]">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="font-black text-foreground">Version 1.2.0</p>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Premium Edition</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
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