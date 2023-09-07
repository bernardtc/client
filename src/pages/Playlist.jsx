import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";



const API_URL = "http://localhost:5005";


const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState({ description: '', image: '', name: '' });

  
  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/playlists/all`);
      setPlaylists(response.data.all);
    } catch (error) {
      toast.error('Error fetching playlists:', error);
    }
  };


  const createPlaylist = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/playlists/create`, newPlaylist);
      setPlaylists([...playlists, response.data.createPlaylistDB]);
      setNewPlaylist({ description: '', image: '', name: '' });
    } catch (error) {
      toast.error('Error creating playlist:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []); 

  return (
    <div>
      <h1>Playlist Management</h1>
      <div>
        <h2>Create a New Playlist</h2>
        <input
          type="text"
          placeholder="Name"
          value={newPlaylist.name}
          onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newPlaylist.description}
          onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newPlaylist.image}
          onChange={(e) => setNewPlaylist({ ...newPlaylist, image: e.target.value })}
        />
        <button onClick={createPlaylist}>Create Playlist</button>
      </div>
      <h2>All Playlists</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist._id}>
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
            <img src={playlist.image} alt={playlist.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistList;
