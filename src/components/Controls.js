// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { IoPlaySharp, IoPauseSharp } from 'react-icons/io5';

// const API_URL = 'http://localhost:5005';

// const Controls = ({ trackId }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const togglePlayPause = () => {
//     setIsPlaying((prev) => !prev);
//   };

//   useEffect(() => {
//     const fetchAudioUrl = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/audio/${trackId}`);
//         if (response.data && response.data.audioUrl) {
//           setIsPlaying(true);
//         } else {
//           setError('Audio URL not found.');
//         }
//       } catch (error) {
//         console.error('Error fetching audio URL:', error);
//         setError('Error loading audio. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAudioUrl();
//   }, [trackId]);

//   return (
//     <div className="controls-wrapper">
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <div className="controls">
//           <button onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
//             {isPlaying ? (
//               <IoPauseSharp alt="Pause" />
//             ) : (
//               <IoPlaySharp alt="Play" />
//             )}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// Controls.defaultProps = {
//   trackId: null,
// };

// export default Controls;
