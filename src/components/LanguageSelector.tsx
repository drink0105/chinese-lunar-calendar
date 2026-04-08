import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh-CN', name: '简体中文' },
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'th', name: 'ไทย' },
    { code: 'vi', name: 'Tiếng Việt' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#C0392B] hover:bg-primary/10">
          <Languages size={20} />
        </Button>
      </DropdownMenuTrigger>
      {/* Force white background and black text regardless of theme */}
      <DropdownMenuContent 
        align="end" 
        className="bg-white text-black border-gray-200 shadow-xl rounded-2xl min-w-[140px] z-[100]"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={cn(
              "cursor-pointer font-medium focus:bg-gray-100 focus:text-black py-3 px-4 transition-colors",
              i18n.language === lang.code ? 'bg-gray-100 font-bold text-primary' : 'text-gray-700'
            )}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;