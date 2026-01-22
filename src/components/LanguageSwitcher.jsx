import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const LanguageSwitcher = () => {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(lng);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => changeLanguage('en')}
        className={`p-1 rounded transition-colors ${
          i18n?.language === 'en'
            ? 'bg-blue-100 text-blue-800'
            : 'hover:bg-gray-100 text-gray-600'
        }`}
        title={t('English')}
      >
        🇺🇸
      </button>
      <button
        onClick={() => changeLanguage('pt')}
        className={`p-1 rounded transition-colors ${
          i18n?.language === 'pt'
            ? 'bg-blue-100 text-blue-800'
            : 'hover:bg-gray-100 text-gray-600'
        }`}
        title={t('Portuguese')}
      >
        🇧🇷
      </button>
    </div>
  );
};

export default LanguageSwitcher;