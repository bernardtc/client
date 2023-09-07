import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5005';

const AudioPlayer = ({ trackId }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/audio/${trackId}`);
        if (response.data && response.data.audioUrl) {
          setAudioUrl(response.data.audioUrl);
        } else {
          toast.error('Audio URL not found.');
        }
      } catch (error) {
        console.error('Error fetching audio URL:', error);
        toast.error('Error loading audio. Please try again later.');
      }
    };

    fetchAudioUrl();
  }, [trackId]);

  const playAudio = () => {
    if (audioUrl) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioUrl) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <button onClick={playAudio} disabled={isPlaying}>
            Play
          </button>
          <button onClick={pauseAudio} disabled={!isPlaying}>
            Pause
          </button>
          {audioUrl ? (
            <audio ref={audioRef}>
              <source src={audioUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p>Audio loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
