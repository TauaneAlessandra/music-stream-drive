import React from 'react';
import { Box, Typography, Avatar, IconButton, Tooltip } from '@mui/material';
import { LibraryMusic, SpaceDashboard as DashIcon, CloudQueue, Settings, Analytics } from '@mui/icons-material';
import { Dropdown, DropdownItem } from '../../components/Dropdown';
import MusicIndicator from '../../components/MusicIndicator';
import { tabOptions } from '../../constants';

const DashboardLayout = ({ children, currentTabOption, setCurrentTabOption }) => {
  return (
    <Box className="main-app-shell">
      {/* Sidebar Nav */}
      <Box className="glass sidebar-nav">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 8, px: 2 }}>
          <Box sx={{ 
            width: 44, 
            height: 44, 
            borderRadius: '14px', 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 8px 16px var(--primary-glow)' 
          }}>
            <LibraryMusic sx={{ fontSize: 28 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>Smart Dash</Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <button 
            className={`nav-link ${currentTabOption === tabOptions.dash ? 'active' : ''}`}
            onClick={() => setCurrentTabOption(tabOptions.dash)}
          >
            <DashIcon sx={{ fontSize: 22 }} /> Dashboard
          </button>
          <button 
            className={`nav-link ${currentTabOption === tabOptions.music ? 'active' : ''}`}
            onClick={() => setCurrentTabOption(tabOptions.music)}
          >
            <LibraryMusic sx={{ fontSize: 22 }} /> My Library
          </button>
          <button 
            className={`nav-link ${currentTabOption === tabOptions.analytics ? 'active' : ''}`}
            onClick={() => setCurrentTabOption(tabOptions.analytics)}
          >
            <Analytics sx={{ fontSize: 22 }} /> Analytics
          </button>
          <button 
            className={`nav-link ${currentTabOption === tabOptions.settings ? 'active' : ''}`}
            onClick={() => setCurrentTabOption(tabOptions.settings)}
          >
            <Settings sx={{ fontSize: 22 }} /> Settings
          </button>
        </Box>

        {/* Mini Player Integrated in Sidebar */}
        <Box sx={{ mt: 'auto' }}>
          <MusicIndicator />
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box className="glass content-area">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
           <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -1, mb: 0.5 }}>
                {currentTabOption === tabOptions.dash && 'Overview'}
                {currentTabOption === tabOptions.music && 'Music Library'}
                {currentTabOption === tabOptions.analytics && 'Market Analytics'}
                {currentTabOption === tabOptions.settings && 'System Settings'}
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-dim)', fontWeight: 500 }}>
                {currentTabOption === tabOptions.dash && 'Welcome back, Tauane! Everything looks great.'}
                {currentTabOption === tabOptions.music && 'Manage your cloud tracks and playlists.'}
                {currentTabOption === tabOptions.analytics && 'Deep insights into your digital music footprint.'}
                {currentTabOption === tabOptions.settings && 'Configure your profile and ecosystem preferences.'}
              </Typography>
           </Box>
           
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Tooltip title="Cloud Status">
                <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)' }}>
                  <CloudQueue sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
              <Dropdown placement="bottom-end">
                <Box slot="trigger" sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', p: 0.8, pr: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', transition: 'var(--transition)', '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' } }}>
                  <Avatar sx={{ width: 36, height: 36, bgcolor: 'var(--primary)', fontSize: 14, fontWeight: 800, boxShadow: '0 4px 10px var(--primary-glow)' }}>T</Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Tauane</Typography>
                </Box>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem divider>Settings</DropdownItem>
                <DropdownItem sx={{ color: '#ff4b2b' }}>Sign Out</DropdownItem>
              </Dropdown>
           </Box>
        </header>

        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
