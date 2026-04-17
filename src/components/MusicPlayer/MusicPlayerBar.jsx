import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Typography, Slider, Stack, Drawer, Button as MuiButton, Tooltip } from "@mui/material";
import { 
  PlayArrow, Pause, MusicNote, InfoOutlined, 
  CloudDownload, VolumeUp, VolumeDown, VolumeOff 
} from "@mui/icons-material";
import { getStreamUrl } from '../../services/MusicService';

/**
 * Componente principal do Player de Música
 */
export default function MusicPlayerBar({ currentMusic }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(localStorage.getItem('player_volume') ? Number(localStorage.getItem('player_volume')) : 0.7);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sincroniza estado de reprodução
  useEffect(() => {
    if (currentMusic && audioRef.current) {
      audioRef.current.play().catch(e => console.warn("Auto-play blocked", e));
      setPlaying(true);
    }
  }, [currentMusic]);

  // Sincroniza volume
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
        localStorage.setItem('player_volume', volume);
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  if (!currentMusic) return null;

  return (
    <Box className="glass" sx={playerContainerStyle}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 4 }}>
        
        {/* Lado Esquerdo: Info da Música */}
        <TrackInfo currentMusic={currentMusic} />

        {/* Centro: Controles de Reprodução e Progresso */}
        <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton onClick={togglePlay} sx={playButtonStyle}>
            {playing ? <Pause /> : <PlayArrow />}
          </IconButton>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', mt: 1 }}>
            <Typography variant="caption" sx={timeTextStyle}>{formatTime(progress)}</Typography>
            <Slider
              size="small"
              value={progress}
              max={duration || 100}
              onChange={(e, val) => { if (audioRef.current) audioRef.current.currentTime = val; }}
              sx={sliderStyle}
            />
            <Typography variant="caption" sx={timeTextStyle}>{formatTime(duration)}</Typography>
          </Stack>
        </Box>

        {/* Lado Direito: Volume e Opções */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
            <VolumeControl volume={volume} setVolume={setVolume} />
            
            <Tooltip title="Informações Detalhadas">
                <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'var(--text-dim)', '&:hover': { color: '#fff' } }}>
                    <InfoOutlined />
                </IconButton>
            </Tooltip>
        </Box>
      </Box>

      <TrackDetailsDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        currentMusic={currentMusic} 
      />

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

// Sub-componentes e Estilos (para reduzir o tamanho do componente principal)

const TrackInfo = ({ currentMusic }) => (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2, minWidth: 200 }}>
        <Box sx={artworkStyle}>
            <MusicNote sx={{ color: '#fff' }} />
        </Box>
        <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 800 }}>{currentMusic.name}</Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-dim)', fontWeight: 600 }}>CLOUD TRACK</Typography>
        </Box>
    </Box>
);

const VolumeControl = ({ volume, setVolume }) => (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ width: 140, ml: 2 }}>
        <IconButton size="small" sx={{ color: 'var(--text-dim)' }} onClick={() => setVolume(v => v === 0 ? 0.7 : 0)}>
            {volume === 0 ? <VolumeOff fontSize="small" /> : volume < 0.5 ? <VolumeDown fontSize="small" /> : <VolumeUp fontSize="small" />}
        </IconButton>
        <Slider
            size="small"
            value={volume}
            min={0}
            max={1}
            step={0.01}
            onChange={(e, val) => setVolume(val)}
            sx={{
                color: 'var(--text-dim)',
                '&:hover': { color: 'var(--primary)' },
                '& .MuiSlider-thumb': { width: 8, height: 8 },
                '& .MuiSlider-rail': { opacity: 0.1 }
            }}
        />
    </Stack>
);

const TrackDetailsDrawer = ({ open, onClose, currentMusic }) => (
    <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{ sx: drawerStyle }}
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
        </Box>

        <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
            <MuiButton fullWidth onClick={onClose} variant="outlined" sx={{ color: '#fff', borderColor: 'var(--border-glass)' }}>
                Close
            </MuiButton>
            <MuiButton 
                fullWidth variant="contained" 
                startIcon={<CloudDownload />}
                sx={{ bgcolor: 'var(--primary)', '&:hover': { bgcolor: 'var(--secondary)' } }}
                onClick={() => window.open(getStreamUrl(currentMusic.id), '_blank')}
            >
                Download
            </MuiButton>
        </Box>
    </Drawer>
);

// Estilos Reutilizáveis
const playerContainerStyle = {
    position: "fixed", bottom: 32, left: 320, right: 32, height: 100, px: 4, zIndex: 1000,
    display: "flex", alignItems: "center", borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.1)'
};

const playButtonStyle = {
    bgcolor: '#fff', color: 'var(--bg-dark)', width: 48, height: 48, transition: 'var(--transition)',
    '&:hover': { bgcolor: 'var(--primary)', color: '#fff', transform: 'scale(1.1)' }
};

const sliderStyle = {
    color: 'var(--primary)',
    '& .MuiSlider-thumb': { 
        width: 12, height: 12, transition: 'var(--transition)',
        '&:hover': { width: 16, height: 16 }, '&:before': { display: 'none' }
    },
    '& .MuiSlider-rail': { opacity: 0.1, bgcolor: '#fff' }
};

const artworkStyle = {
    width: 56, height: 56, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    boxShadow: '0 8px 16px var(--primary-glow)'
};

const drawerStyle = {
    width: 400, bgcolor: 'rgba(9, 9, 11, 0.95)', backdropFilter: 'blur(20px)', color: '#fff', 
    p: 4, borderLeft: '1px solid var(--border-glass)'
};

const timeTextStyle = { minWidth: 40, color: 'var(--text-dim)', fontWeight: 600 };

