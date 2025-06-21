
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5c8d312f160348ce9f33cf1a92c9234d',
  appName: 'A Lovable project',
  webDir: 'dist',
  server: {
    url: 'https://5c8d312f-1603-48ce-9f33-cf1a92c9234d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#4F46E5',
      showSpinner: true,
      spinnerColor: '#ffffff'
    }
  }
};

export default config;
