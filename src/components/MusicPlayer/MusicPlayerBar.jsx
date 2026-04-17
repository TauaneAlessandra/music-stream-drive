import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Typography, Slider, Stack, Drawer, Button as MuiButton } from "@mui/material";
import { PlayArrow, Pause, MusicNote, InfoOutlined, CloudDownload } from "@mui/icons-material";
import { getStreamUrl } from '../../services/MusicService';

export default function MusicPlayerBar({ currentMusic }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (currentMusic && audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
    }
  }, [currentMusic]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSliderChange = (e, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setProgress(newValue);
    }
  };

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  if (!currentMusic) return null;

  return (
    <Box
      className="glass"
      sx={{
        position: "fixed",
        bottom: 32,
        left: 320,
        right: 32,
        height: 100,
        display: "flex",
        alignItems: "center",
        px: 4,
        zIndex: 1000,
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 4 }}>
        {/* Info Area */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2, minWidth: 200 }}>
          <Box sx={{ 
            width: 56, 
            height: 56, 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            borderRadius: 3, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 8px 16px var(--primary-glow)'
          }}>
            <MusicNote sx={{ color: '#fff' }} />
          </Box>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 800 }}>
              {currentMusic.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-dim)', fontWeight: 600 }}>
              CLOUD TRACK
            </Typography>
          </Box>
        </Box>

        {/* Controls Area */}
        <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton
              onClick={togglePlay}
              sx={{ 
                  bgcolor: '#fff', 
                  color: 'var(--bg-dark)',
                  '&:hover': { bgcolor: 'var(--primary)', color: '#fff', transform: 'scale(1.1)' },
                  width: 48,
                  height: 48,
                  transition: 'var(--transition)'
              }}
          >
            {playing ? <Pause /> : <PlayArrow />}
          </IconButton>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', mt: 1 }}>
            <Typography variant="caption" sx={{ minWidth: 40, textAlign: 'right', color: 'var(--text-dim)', fontWeight: 600 }}>
              {formatTime(progress)}
            </Typography>
            <Slider
              size="small"
              value={progress}
              max={duration || 100}
              onChange={handleSliderChange}
              sx={{
                color: 'var(--primary)',
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                  transition: 'var(--transition)',
                  '&:hover': { width: 16, height: 16 },
                  '&:before': { display: 'none' },
                },
                '& .MuiSlider-rail': { opacity: 0.1, bgcolor: '#fff' }
              }}
            />
            <Typography variant="caption" sx={{ minWidth: 40, color: 'var(--text-dim)', fontWeight: 600 }}>
              {formatTime(duration)}
            </Typography>
          </Stack>
        </Box>

        {/* Extra Actions */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'var(--text-dim)', '&:hover': { color: '#fff' } }}>
                <InfoOutlined />
            </IconButton>
        </Box>
      </Box>

      {/* Details Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 400, bgcolor: 'rgba(9, 9, 11, 0.95)', backdropFilter: 'blur(20px)', color: '#fff', p: 4, borderLeft: '1px solid var(--border-glass)' }
        }}
      >
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 800 }}>Track Details</Typography>
        <Typography variant="caption" sx={{ color: 'var(--text-dim)', mb: 4, display: 'block', fontWeight: 600 }}>
            CLOUD INFRASTRUCTURE SOURCE
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, my: 6 }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase' }}>File Name</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>{currentMusic.name}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase' }}>Google Drive ID</Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-dim)', wordBreak: 'break-all' }}>{currentMusic.id}</Typography>
          </Box>
          <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2, border: '1px solid var(--border-glass)' }}>
            <Typography variant="body2" sx={{ color: 'var(--text-dim)' }}>
               This track is being securely proxied from your Google Drive storage.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
          <MuiButton fullWidth onClick={() => setDrawerOpen(false)} variant="outlined" sx={{ color: '#fff', borderColor: 'var(--border-glass)' }}>
            Close
          </MuiButton>
          <MuiButton 
            fullWidth
            variant="contained" 
            sx={{ bgcolor: 'var(--primary)', '&:hover': { bgcolor: 'var(--secondary)' } }}
            startIcon={<CloudDownload />}
            onClick={() => window.open(getStreamUrl(currentMusic.id), '_blank')}
          >
            Download
          </MuiButton>
        </Box>
      </Drawer>

      <audio
        ref={audioRef}
        src={getStreamUrl(currentMusic.id)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
      />
    </Box>
  );
}

