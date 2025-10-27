import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { translations } from '../lib/translations';

interface LanguageContextType {
  language: 'en' | 'ms';
  setLanguage: (lang: 'en' | 'ms') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { profile, updateProfile } = useAuth();
  const [language, setLanguageState] = useState<'en' | 'ms'>('en');

  useEffect(() => {
    if (profile?.language_preference) {
      setLanguageState(profile.language_preference);
    }
  }, [profile]);

  const setLanguage = async (lang: 'en' | 'ms') => {
    setLanguageState(lang);
    if (profile) {
      try {
        await updateProfile({ language_preference: lang });
      } catch (error) {
        console.error('Error updating language preference:', error);
      }
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
