import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

// Hooks & Services
import { useGoogleDrive } from './hooks/useGoogleDrive';

// Theme & Constants
import { premiumTheme } from './theme';
import { tabOptions } from './constants';

// Layout
import DashboardLayout from './presentation/layout/DashboardLayout';

// Pages
import DashboardMusicScreen from './presentation/pages/DashboardMusicScreen';
import LoginPage from './presentation/pages/LoginPage';
import AnalyticsPage from './presentation/pages/AnalyticsPage';
import SettingsPage from './presentation/pages/SettingsPage';
import HomePage from './presentation/pages/HomePage';

// Components
import MusicPlayerBar from './components/MusicPlayer/MusicPlayerBar';

const queryClient = new QueryClient();

function App() {
  const { isSignedIn, handleAuth } = useGoogleDrive();
  const [currentTabOption, setCurrentTabOption] = useState(tabOptions.music);
  const [currentMusic, setCurrentMusic] = useState(null);

  if (!isSignedIn) {
    return (
      <ThemeProvider theme={premiumTheme}>
        <CssBaseline />
        <div className="mesh-bg" />
        <LoginPage onAuth={handleAuth} />
      </ThemeProvider>
    );
  }

  const renderContent = () => {
    switch (currentTabOption) {
      case tabOptions.dash:
        return <HomePage onOpenLibrary={() => setCurrentTabOption(tabOptions.music)} />;
      case tabOptions.music:
        return (
          <motion.div 
            key="music" 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.98 }} 
            transition={{ duration: 0.5 }}
          >
            <DashboardMusicScreen currentMusic={currentMusic} onSelectMusic={setCurrentMusic} />
          </motion.div>
        );
      case tabOptions.analytics:
        return <AnalyticsPage />;
      case tabOptions.settings:
        return <SettingsPage />;
      default:
        return <HomePage onOpenLibrary={() => setCurrentTabOption(tabOptions.music)} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={premiumTheme}>
        <CssBaseline />
        <div className="mesh-bg" />
        
        <DashboardLayout currentTabOption={currentTabOption} setCurrentTabOption={setCurrentTabOption}>
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </DashboardLayout>

        {/* Global Player Bar */}
        <MusicPlayerBar currentMusic={currentMusic} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}


export default App;

