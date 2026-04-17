import { List, ListItemButton, ListItemText, Typography, Avatar, Box, IconButton } from "@mui/material";
import { MusicNote, MoreVert, PlayArrow, Favorite, Share, CloudDownload } from "@mui/icons-material";
import { Dropdown, DropdownItem } from "../Dropdown";

export default function MusicList({ musics, onSelect, currentMusic }) {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
        <Typography variant="overline" sx={{ color: 'var(--text-dim)', fontWeight: 700, px: 2, mb: 2, display: 'block' }}>
          Your Collection
        </Typography>
      <List sx={{ p: 0 }}>
        {musics.map((music) => (
          <ListItemButton 
            key={music.id} 
            onClick={() => onSelect(music)}
            selected={currentMusic?.id === music.id}
            sx={{
              borderRadius: 3,
              mb: 1,
              pr: 8,
              transition: 'var(--transition)',
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.05)",
                transform: 'translateX(4px)'
              },
              "&.Mui-selected": {
                bgcolor: "rgba(157, 80, 187, 0.1)",
                "&:hover": {
                  bgcolor: "rgba(157, 80, 187, 0.15)"
                }
              }
            }}
          >
            <Avatar variant="rounded" sx={{ 
                bgcolor: currentMusic?.id === music.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)', 
                mr: 2,
                transition: 'var(--transition)'
            }}>
              <MusicNote sx={{ color: currentMusic?.id === music.id ? '#fff' : 'var(--text-dim)' }} />
            </Avatar>
            <ListItemText 
              primary={music.name} 
              primaryTypographyProps={{ 
                color: currentMusic?.id === music.id ? "var(--primary)" : "var(--text-main)",
                fontWeight: currentMusic?.id === music.id ? '700' : '500',
                fontSize: '0.95rem'
              }}
              secondary="Google Drive Cloud Audio"
              secondaryTypographyProps={{ color: "var(--text-dim)", variant: "caption" }}
            />
            
            {/* Options Dropdown */}
            <Box onClick={(e) => e.stopPropagation()} sx={{ position: 'absolute', right: 12 }}>
              <Dropdown placement="bottom-end">
                <Box slot="trigger">
                   <IconButton size="small" sx={{ color: 'var(--text-dim)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.05)' } }}>
                    <MoreVert fontSize="small" />
                  </IconButton>
                </Box>
                <DropdownItem>Reproduzir agora</DropdownItem>
                <DropdownItem>Adicionar aos favoritos</DropdownItem>
                <DropdownItem>Baixar</DropdownItem>
                <DropdownItem divider>Compartilhar</DropdownItem>
              </Dropdown>
            </Box>
          </ListItemButton>
        ))}
      </List>
      </Box>
    </Box>
  );
}

