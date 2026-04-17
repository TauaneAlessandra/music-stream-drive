import React from 'react';
import { Card, CardContent, Box, Typography, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Card className="glass-card" sx={{ height: '100%', bgcolor: 'transparent' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ 
          p: 1.5, 
          borderRadius: 3, 
          bgcolor: `${color}15`, 
          color: color,
          display: 'flex'
        }}>
          {icon}
        </Box>
        <IconButton size="small"><MoreVert sx={{ color: 'var(--text-dim)' }} /></IconButton>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--text-dim)', mb: 0.5 }}>{title}</Typography>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
    </CardContent>
  </Card>
);

export default StatCard;
