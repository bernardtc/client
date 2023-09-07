import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const API_URL = "http://localhost:5005";

const CreatePlaylist = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [trackIds, setTrackIds] = useState([]);
  const [tracks, setTracks] = useState([]);

  

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/track`)  
      .then((response) => {
        setTracks(response.data.tracks);
      })
      .catch((err) => {
        console.error('Error fetching tracks:', err);
      });
  }, []);

  const handleTrackSelection = (trackId) => {
    if (trackIds.includes(trackId)) {
      setTrackIds(trackIds.filter((id) => id !== trackId));
    } else {
      setTrackIds([...trackIds, trackId]);
    }
  };

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', image);
    formData.append('name', name);
    formData.append('trackIds', JSON.stringify(trackIds));

    axios
      .post(`${API_URL}/api/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success('Playlist created successfully.');
        console.log(" anything created ", response.data)
        navigate('/');
      })
      .catch((err) => {
        toast.error('Error creating playlist. Please try again.');
        console.error('Error creating playlist:', err);
        console.log(" catch error pleade ", err)
      });
  };


  console.log(" catch error pleade ", )


  return (
    <div>
      <h2>Create Playlist</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <h3>Select Tracks:</h3>
          <ul>
            {tracks.map((track) => (
              <li key={track._id}>
                <input
                  type="checkbox"
                  id={`track-${track._id}`}
                  checked={trackIds.includes(track._id)}
                  onChange={() => handleTrackSelection(track._id)}
                />
                <label htmlFor={`track-${track._id}`}>{track.name}</label>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Create Playlist</button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
