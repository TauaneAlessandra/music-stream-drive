import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMusics, getStreamUrl } from '../services/MusicService';
import { Play, Pause, Disc, Layout } from 'lucide-react';
import { Box, Typography, IconButton, Slider, Stack } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const MusicIndicator = () => {
  const [currentId, setCurrentId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Demo progress

  const { data: musics, isLoading, error } = useQuery({
    queryKey: ['musics'],
    queryFn: getMusics,
    refetchOnWindowFocus: false
  });

  const activeTrack = musics?.find(m => m.id === currentId);

  const handlePlay = (id) => {
    if (currentId === id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentId(id);
      setIsPlaying(true);
    }
  };

  if (isLoading) return null;

  return (
    <Box className="glass-card indicator-premium" sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)' }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ 
            position: 'relative',
            width: 48, 
            height: 48, 
            borderRadius: 2, 
            bgcolor: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
             <Disc className={isPlaying ? "spin" : ""} size={24} style={{ opacity: 0.3 }} />
             <Box sx={{ 
               position: 'absolute', 
               inset: 0, 
               background: 'linear-gradient(135deg, rgba(157, 80, 187, 0.2), rgba(0, 210, 255, 0.2))' 
             }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {activeTrack ? activeTrack.name : 'Not Playing'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-dim)' }}>
              {activeTrack ? 'Google Drive Track' : 'Select a track'}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Slider 
            size="small" 
            value={progress} 
            sx={{ 
              color: 'var(--primary)',
              padding: '4px 0',
              '& .MuiSlider-thumb': {
                width: 0,
                height: 0,
                '&:hover, &.Mui-focusVisible': {
                  width: 8,
                  height: 8,
                },
              },
              '& .MuiSlider-rail': {
                opacity: 0.1,
              }
            }} 
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: -1 }}>
            <IconButton 
              onClick={() => activeTrack && setIsPlaying(!isPlaying)}
              sx={{ 
                color: '#fff', 
                bgcolor: 'rgba(255,255,255,0.05)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </IconButton>
          </Box>
        </Box>
      </Stack>

      <div style={{ display: 'none' }}>
        {currentId && (
          <audio 
            autoPlay={isPlaying}
            src={getStreamUrl(currentId)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            ref={(audio) => {
              if (audio) {
                if (isPlaying) audio.play().catch(() => {});
                else audio.pause();
              }
            }}
          />
        )}
      </div>
    </Box>
  );
};

export default MusicIndicator;

