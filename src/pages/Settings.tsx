import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme, ThemeType } from '@/hooks/use-theme';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Palette, Info, ShieldCheck, Check, Moon, Sun, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
  const { t } = useTranslation();
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  const themes: { id: ThemeType; nameKey: string; colors: string[]; symbol: string }[] = [
    { id: 'classic', nameKey: 'theme.classic', colors: ['bg-[#C0392B]', 'bg-[#F39C12]'], symbol: '' },
    { id: 'spring', nameKey: 'theme.spring', colors: ['bg-[#9F1239]', 'bg-[#F39C12]'], symbol: '🏮' },
    { id: 'dragonboat', nameKey: 'theme.dragonboat', colors: ['bg-[#0F766E]', 'bg-[#C0392B]'], symbol: '🛶' },
    { id: 'midautumn', nameKey: 'theme.midautumn', colors: ['bg-[#B45309]', 'bg-[#C0392B]'], symbol: '🌕' },
  ];

  return (
    <div className="pb-32 pt-6 px-4 max-w-md mx-auto min-h-screen">
      <div className="space-y-8">
        <h1 className="text-3xl font-black text-primary mb-8 text-center tracking-tight">
          {t('settings.title')}
        </h1>

        <section className="space-y-4">
          <h2 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] px-2 flex items-center gap-2">
            <Palette size={14} /> {t('theme.appearance')}
          </h2>
          
          <Card className="glass-card rounded-[2rem] overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                  {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <Label htmlFor="dark-mode" className="font-bold text-foreground">
                  {isDarkMode ? t('theme.dark') : t('theme.light')}
                </Label>
              </div>
              <Switch 
                id="dark-mode" 
                checked={isDarkMode} 
                onCheckedChange={toggleDarkMode}
                className="data-[state=checked]:bg-primary"
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {themes.map((t_item) => (
              <button
                key={t_item.id}
                onClick={() => setTheme(t_item.id)}
                className={`relative group overflow-hidden rounded-3xl border-2 transition-all duration-300 aspect-square flex flex-col items-center justify-center gap-2 ${
                  theme === t_item.id 
                    ? 'border-primary shadow-xl shadow-primary/20 scale-[1.02] bg-card' 
                    : 'border-border hover:border-primary/30 bg-card/50'
                }`}
              >
                <div className="flex -space-x-2">
                  {t_item.colors.map((c, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-background ${c}`} />
                  ))}
                </div>
                <span className={`text-xs font-black ${theme === t_item.id ? 'text-primary' : 'text-foreground/70'}`}>
                  {t(t_item.nameKey)}
                </span>
                {t_item.symbol && <span className="text-xl">{t_item.symbol}</span>}
                {theme === t_item.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
                    <Check size={12} strokeWidth={4} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] px-2 flex items-center gap-2">
            <Info size={14} /> {t('settings.about')}
          </h2>
          <Card className="glass-card rounded-[2rem]">
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
                {t('settings.about_desc')}
              </p>
              
              <div className="pt-4 border-t border-border/50">
                <Link 
                  to="/privacy" 
                  className="flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 rounded-2xl transition-colors group"
                >
                  <span className="font-bold text-primary">{t('settings.privacy_policy')}</span>
                  <ExternalLink size={18} className="text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Settings;