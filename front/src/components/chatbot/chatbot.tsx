'use client';

import { useEffect } from 'react';

interface Landbot {
  Livechat: new (options: { configUrl: string }) => void;
}

declare global {
  interface Window {
    myLandbot?: InstanceType<Landbot['Livechat']>; // Especificamos el tipo de myLandbot
    Landbot: Landbot;
  }
}

const Chatbot: React.FC = () => {
  useEffect(() => {
    const initLandbot = () => {
      if (!window.myLandbot) {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.addEventListener('load', function () {
          window.myLandbot = new window.Landbot.Livechat({
            configUrl:
              'https://storage.googleapis.com/landbot.site/v3/H-2711293-EO7E3H3R3NYZOE88/index.json',
          });
        });
        s.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
        const x = document.getElementsByTagName('script')[0];
        x.parentNode?.insertBefore(s, x);
      }
    };

    window.addEventListener('mouseover', initLandbot, { once: true });
    window.addEventListener('touchstart', initLandbot, { once: true });

    return () => {
      window.removeEventListener('mouseover', initLandbot);
      window.removeEventListener('touchstart', initLandbot);
    };
  }, []);

  return null;
};

export default Chatbot;
