'use client'

import { useEffect } from 'react';
import i18n from '../i18n';

const I18nProvider = ({ children }) => {
  useEffect(() => {
    // Ensure i18n is initialized on the client side
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return <>{children}</>;
};

export default I18nProvider;