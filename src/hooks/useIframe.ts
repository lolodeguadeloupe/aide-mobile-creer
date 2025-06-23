
import { useState, useEffect } from 'react';

export const useIframe = () => {
  const [isInIframe, setIsInIframe] = useState(false);
  const [parentOrigin, setParentOrigin] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si l'app est dans une iframe
    const checkIframe = () => {
      const inIframe = window.self !== window.top;
      setIsInIframe(inIframe);
      
      if (inIframe) {
        try {
          // Essayer de récupérer l'origine du parent
          setParentOrigin(document.referrer || null);
        } catch (error) {
          console.log('Cannot access parent origin due to cross-origin restrictions');
        }
      }
    };

    checkIframe();

    // Écouter les messages du parent si dans une iframe
    const handleMessage = (event: MessageEvent) => {
      if (isInIframe) {
        // Traiter les messages du parent si nécessaire
        console.log('Message from parent:', event.data);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isInIframe]);

  // Fonction pour communiquer avec le parent
  const postMessageToParent = (message: any) => {
    if (isInIframe && window.parent) {
      window.parent.postMessage(message, '*');
    }
  };

  return {
    isInIframe,
    parentOrigin,
    postMessageToParent
  };
};
