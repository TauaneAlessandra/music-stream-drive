import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { LibraryMusic, Login } from '@mui/icons-material';

const LoginPage = ({ onAuth }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    p: 3
  }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box className="glass" sx={{ 
        p: 6, 
        textAlign: 'center', 
        maxWidth: 450,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      }}>
        <Box sx={{ 
          width: 80, 
          height: 80, 
          borderRadius: '24px', 
          background: 'linear-gradient(135deg, #9d50bb, #6e48aa)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(157, 80, 187, 0.4)'
        }}>
          <LibraryMusic sx={{ fontSize: 40, color: '#fff' }} />
        </Box>
        
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Smart Dash</Typography>
          <Typography sx={{ color: 'var(--text-dim)', fontSize: '0.95rem', mb: 2 }}>
            Your premium music ecosystem powered by Google Drive.
          </Typography>
          {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
            <Typography variant="caption" sx={{ color: 'var(--primary-light)', bgcolor: 'rgba(157, 80, 187, 0.1)', px: 1.5, py: 0.5, borderRadius: '8px', fontWeight: 600 }}>
              ⚠️ Running in Demo Mode (No Client ID found)
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <button className="btn-premium" onClick={onAuth}>
            <Login /> {import.meta.env.VITE_GOOGLE_CLIENT_ID ? 'Connect Google Drive' : 'Enter Demo Mode'}
          </button>
          
          {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
            <Typography variant="caption" sx={{ color: 'var(--text-dim)', maxWidth: 300 }}>
              To use real data, please add your <b>VITE_GOOGLE_CLIENT_ID</b> to the <b>.env</b> file.
            </Typography>
          )}
        </Box>
      </Box>
    </motion.div>
  </Box>
);

export default LoginPage;
