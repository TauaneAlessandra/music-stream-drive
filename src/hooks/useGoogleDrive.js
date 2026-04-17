import { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

// For demo purposes, we'll use some mock data if API keys aren't provided
const MOCK_DATA = [
  {
    id: '1',
    name: 'Midnight City - M83',
    mimeType: 'audio/mpeg',
    thumbnailLink: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
    webContentLink: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    name: 'Starboy - The Weeknd',
    mimeType: 'audio/mpeg',
    thumbnailLink: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop',
    webContentLink: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    name: 'Blinding Lights - The Weeknd',
    mimeType: 'audio/mpeg',
    thumbnailLink: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    webContentLink: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

export const useGoogleDrive = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [files, setFiles] = useState(MOCK_DATA); // Default to mock data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

  const initClient = () => {
    if (!CLIENT_ID || !API_KEY) {
      console.warn("Google Drive API keys missing. Using mock data.");
      return;
    }

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      scope: SCOPES,
    }).then(() => {
      const auth = gapi.auth2.getAuthInstance();
      setIsSignedIn(auth.isSignedIn.get());
      auth.isSignedIn.listen(setIsSignedIn);
      if (auth.isSignedIn.get()) {
        listFiles();
      }
    }).catch(err => {
      console.error("Error initializing GAPI:", err);
      setError(err);
    });
  };

  const handleAuth = () => {
    if (!CLIENT_ID) {
      alert("Por favor, configure as chaves do Google Cloud no arquivo .env");
      return;
    }
    gapi.auth2.getAuthInstance().signIn();
  };

  const listFiles = async () => {
    setLoading(true);
    try {
      const response = await gapi.client.drive.files.list({
        pageSize: 50,
        fields: "nextPageToken, files(id, name, mimeType, webContentLink, thumbnailLink)",
        q: "mimeType contains 'audio/'"
      });
      const driveFiles = response.result.files;
      if (driveFiles && driveFiles.length > 0) {
        setFiles(driveFiles);
      }
    } catch (err) {
      console.error("Error fetching files:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gapi.load("client:auth2", initClient);
  }, []);

  return { isSignedIn, files, loading, error, handleAuth, listFiles };
};
