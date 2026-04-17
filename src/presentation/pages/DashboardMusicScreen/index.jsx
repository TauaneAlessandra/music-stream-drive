import React, { useState } from "react";
import { Box, CircularProgress, Typography, Fade } from "@mui/material";
import MusicList from "../../../components/MusicPlayer/MusicList";
import MusicPlayerBar from "../../../components/MusicPlayer/MusicPlayerBar";
import { Breadcrumb } from "../../../components/Breadcrumb"; 
import { useQuery } from "@tanstack/react-query";
import { getMusics } from "../../../services/MusicService";

export default function DashboardMusicScreen({ currentMusic, onSelectMusic }) {
  const { data: musics, isLoading, error } = useQuery({
    queryKey: ["musics"],
    queryFn: getMusics,
  });

  if (isLoading) return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', gap: 2 }}>
      <CircularProgress sx={{ color: 'var(--primary)' }} />
      <Typography sx={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Fetching your cloud library...</Typography>
    </Box>
  );

  if (error) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Typography color="error" sx={{ fontWeight: 600 }}>Failed to sync with Google Drive.</Typography>
    </Box>
  );

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ pb: 12 }}>
        <Box sx={{ px: 1, mb: 4 }}>
          <Breadcrumb>
            <a href="/">Smart Dash</a>
            <a href="/music">Music</a>
            <div style={{ color: 'var(--primary)', fontWeight: 600 }}>My Library</div>
          </Breadcrumb>
        </Box>
        
        <Box className="glass-card" sx={{ overflow: 'hidden' }}>
          <MusicList 
            musics={musics || []} 
            onSelect={onSelectMusic} 
            currentMusic={currentMusic}
          />
        </Box>
      </Box>
    </Fade>
  );
}


