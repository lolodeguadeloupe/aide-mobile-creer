import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.aidemobile',
  appName: 'A Lovable project',
  webDir: 'dist',
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
