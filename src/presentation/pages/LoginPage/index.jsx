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
          <Typography sx={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
            Your premium music ecosystem powered by Google Drive.
          </Typography>
        </Box>

        <button className="btn-premium" onClick={onAuth}>
          <Login /> Connect Google Drive
        </button>
      </Box>
    </motion.div>
  </Box>
);

export default LoginPage;
