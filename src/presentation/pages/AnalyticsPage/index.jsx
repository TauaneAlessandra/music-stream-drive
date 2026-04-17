import React from 'react';
import { motion } from 'framer-motion';
import { Grid, Box, Typography, Stack } from '@mui/material';
import { Analytics } from '@mui/icons-material';

const AnalyticsPage = () => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Box className="glass-card" sx={{ p: 4, height: '100%' }}>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>Playback Activity</Typography>
          <Box sx={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 2, px: 2 }}>
            {[60, 40, 80, 50, 90, 70, 100].map((h, i) => (
              <Box key={i} sx={{ flex: 1, height: `${h}%`, bgcolor: 'var(--primary)', borderRadius: '6px 6px 0 0', opacity: 0.4 + (h/200), transition: 'all 0.3s ease', '&:hover': { opacity: 1, transform: 'scaleY(1.05)' } }} />
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, color: 'var(--text-dim)', fontSize: '11px', fontWeight: 700 }}>
            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box className="glass-card" sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Top Genres</Typography>
          <Stack spacing={2}>
             {['Electronic', 'Lofi Hip Hop', 'Jazz Fusion', 'Ambient'].map((genre, i) => (
               <Box key={genre}>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                   <Typography variant="caption" sx={{ fontWeight: 700 }}>{genre}</Typography>
                   <Typography variant="caption" sx={{ color: 'var(--text-dim)' }}>{85 - i*15}%</Typography>
                 </Box>
                 <Box sx={{ height: 4, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                   <Box sx={{ height: '100%', width: `${85 - i*15}%`, bgcolor: i === 0 ? 'var(--primary)' : 'var(--text-dim)', borderRadius: 2 }} />
                 </Box>
               </Box>
             ))}
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12}>
         <Box className="glass-card" sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Audience Reach</Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-dim)', mb: 3 }}>Geographic distribution of your shared playlists metadata.</Typography>
            <Box sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 3, border: '1px dashed var(--border-glass)', textAlign: 'center' }}>
               <Analytics sx={{ fontSize: 40, color: 'var(--text-dim)', opacity: 0.3, mb: 1 }} />
               <Typography variant="caption" sx={{ color: 'var(--text-dim)', display: 'block' }}>Map Data Syncing...</Typography>
            </Box>
         </Box>
      </Grid>
    </Grid>
  </motion.div>
);

export default AnalyticsPage;
