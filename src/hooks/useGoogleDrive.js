import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMusics } from '../services/MusicService';

// Fallback mock data moved to a constant helper if needed, but we'll try to use the API
const MOCK_DATA = [
  {
    id: '1',
    name: 'Midnight City - M83',
    thumbnailLink: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Starboy - The Weeknd',
    thumbnailLink: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop',
  }
];

export const useGoogleDrive = () => {
  const [isSignedIn, setIsSignedIn] = useState(!!localStorage.getItem('google_access_token'));

  // Usando React Query para gerenciar o estado dos arquivos
  const { 
    data: files = MOCK_DATA, 
    isLoading: loading, 
    error,
    refetch: listFiles 
  } = useQuery({
    queryKey: ['music-files'],
    queryFn: getMusics,
    enabled: isSignedIn,
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Implementação moderna do Google Identity Services (GIS)
  useEffect(() => {
    if (window.google) {
        // Inicialização do GIS pode ser adicionada aqui se necessário para fluxo implícito
    }
  }, []);

  const handleAuth = () => {
    if (!CLIENT_ID) {
      console.warn("VITE_GOOGLE_CLIENT_ID missing. Entering Demo Mode...");
      handleDemoLogin();
      return;
    }

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/drive.readonly',
      callback: (response) => {
        if (response.access_token) {
          localStorage.setItem('google_access_token', response.access_token);
          setIsSignedIn(true);
        }
      },
    });
    client.requestAccessToken();
  };

  const handleDemoLogin = () => {
    localStorage.setItem('google_access_token', 'demo_token_123');
    setIsSignedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('google_access_token');
    setIsSignedIn(false);
  };

  return { isSignedIn, files, loading, error, handleAuth, handleLogout, listFiles, handleDemoLogin };
};
