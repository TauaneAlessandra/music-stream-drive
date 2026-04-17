import api from './api';

/**
 * Service to fetch music files from Google Drive via the Smart Dash Backend
 * @returns {Promise<Array>} List of music files
 */
export const getMusics = async () => {
  const { data } = await api.get("drive/musics");
  return data.data; 
};

/**
 * Returns the stream URL for a specific track
 * @param {string} id Google Drive file ID
 * @returns {string} Backend proxy stream URL
 */
export const getStreamUrl = (id) => {
  return `https://localhost:19131/music/stream/${id}`;
};
