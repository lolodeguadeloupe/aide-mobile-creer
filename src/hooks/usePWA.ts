
import { useState, useEffect } from 'react';

interface NavigatorWithGetInstalledRelatedApps extends Navigator {
  getInstalledRelatedApps?: () => Promise<Array<Record<string, unknown>>>;
}

interface WindowWithStandalone extends Window {
  navigator: NavigatorWithGetInstalledRelatedApps;
}

export const usePWA = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Vérifier si l'app est en mode standalone (installée)
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                              (window.navigator as NavigatorWithGetInstalledRelatedApps & { standalone?: boolean }).standalone ||
                              document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
    };

    checkStandalone();

    // Écouter les changements de mode d'affichage
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Support pour les anciens navigateurs
      mediaQuery.addListener(handleChange);
    }

    // Vérifier si l'app est installée
    if ('getInstalledRelatedApps' in navigator) {
      (navigator as NavigatorWithGetInstalledRelatedApps).getInstalledRelatedApps!().then((relatedApps: Array<Record<string, unknown>>) => {
        setIsInstalled(relatedApps.length > 0);
      });
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return {
    isInstalled,
    isStandalone,
    isPWA: isStandalone || isInstalled
  };
};
