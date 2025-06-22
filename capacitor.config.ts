import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5c8d312f160348ce9f33cf1a92c9234d',
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
