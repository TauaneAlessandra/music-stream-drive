import React from 'react';
import { motion } from 'framer-motion';
import { Grid, Box, Typography, Avatar, Stack } from '@mui/material';
import { Settings } from '@mui/icons-material';

const SettingsPage = () => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
         <Box className="glass-card" sx={{ p: 4, textAlign: 'center' }}>
            <Avatar sx={{ width: 100, height: 100, bgcolor: 'var(--primary)', mx: 'auto', mb: 2, fontSize: 40, fontWeight: 800, boxShadow: '0 10px 30px var(--primary-glow)' }}>T</Avatar>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Tauane</Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-dim)', mb: 3 }}>Premium Member</Typography>
            <button className="btn-secondary" style={{ width: '100%' }}>Edit Profile</button>
         </Box>
      </Grid>
      <Grid item xs={12} md={8}>
         <Box className="glass-card" sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 4, fontWeight: 800 }}>Account Settings</Typography>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)' }}>
                 <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>Google Drive Sync</Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-dim)' }}>Active - Last synced 5 mins ago</Typography>
                 </Box>
                 <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>Refresh</button>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)' }}>
                 <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>Audio Quality</Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-dim)' }}>High Fidelity (320kbps)</Typography>
                 </Box>
                 <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>Change</button>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.02)' }}>
                 <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>Security & Privacy</Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-dim)' }}>Manage your OAuth tokens and app permissions</Typography>
                 </Box>
                 <Settings fontSize="small" sx={{ color: 'var(--text-dim)' }} />
              </Box>
            </Stack>
         </Box>
      </Grid>
    </Grid>
  </motion.div>
);

export default SettingsPage;
