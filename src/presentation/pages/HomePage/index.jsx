import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { CloudQueue, LibraryMusic, TrendingUp, PlayArrow } from '@mui/icons-material';
import { motion } from 'framer-motion';
import StatCard from '../../../components/StatCard';
import { tabOptions } from '../../../constants';

const HomePage = ({ onOpenLibrary }) => {
  return (
    <motion.div
      key="dash"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Storage"
            value="1.2 TB"
            icon={<CloudQueue />}
            color="#9d50bb"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Tracks"
            value="2,482"
            icon={<LibraryMusic />}
            color="#22d3ee"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Monthly Plays"
            value="+12.5%"
            icon={<TrendingUp />}
            color="#10b981"
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            className="glass-card"
            sx={{
              p: 6,
              mt: 2,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(157, 80, 187, 0.05))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Ready to dive into your music?
            </Typography>
            <Typography sx={{ color: 'var(--text-dim)', maxWidth: 500, lineHeight: 1.6 }}>
              Your most recent playlists from Google Drive are synchronized and ready for high-fidelity playback.
            </Typography>
            <button
              className="btn-premium"
              onClick={onOpenLibrary}
            >
              <PlayArrow /> Open Library
            </button>
          </Box>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default HomePage;
