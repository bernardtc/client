import axios from "axios";
import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const { Option } = Select;

const enumValues = {
  genre: [
    "Rock",
    "Hip hop",
    "Pop Music",
    "Country music",
    "Punk rock",
    "Christian/Gospel",
    "Indie rock",
    "Techno",
    "New wave",
    "Instrumental",
    "Reggae",
    "Rhythm",
    "Blue",
  ],
};
const API_URL = "https://uplay.cyclic.cloud/";

function Album() {
  const initForm = {
    total_tracks: 0,
    image: null,
    title: "",
    release_date: "",
    genre: "",
    popularity: 0,
    artist: "", 
    album_type: "",
    trackId: "", 
  };

  const [formData, setFormData] = useState(initForm);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
  
    axios
      .get(`${API_URL}/api/track`)
      .then((response) => {
        setTracks(response.data.tracks);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error);
      });

    
    axios
      .get(`${API_URL}/api/artist`)
      .then((response) => {
        setArtists(response.data.artists);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData((prevForm) => ({ ...prevForm, [inputName]: inputValue }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevForm) => ({ ...prevForm, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);

    Object.keys(formData).forEach((key) => {
      if (key !== "image" && key !== "trackId" && formData[key] !== "") {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData.trackId) {
      formDataToSend.append("trackId", formData.trackId);
    }

    try {
      const response = await axios.post(`${API_URL}/api/album`, formDataToSend);
      toast.success("Album Successfully uploaded", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error", error);
      toast.error("An error occurred while uploading.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });
    }
  };

  return (
    <>
      <div>
        <h3>Add Album</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Image</label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <div>
            <label>Release Date</label>
            <Input
              type="date"
              name="release_date"
              value={formData.release_date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Genre</label>
            <Select
              name="genre"
              value={formData.genre}
              onChange={(value) => setFormData({ ...formData, genre: value })}
              required
            >
              <Option value="">Select a genre</Option>
              {enumValues.genre.map((genre) => (
                <Option key={genre} value={genre}>
                  {genre}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <label>Popularity</label>
            <Input
              type="number"
              name="popularity"
              value={formData.popularity}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Artist</label>
            <Select
              name="artist"
              value={formData.artist}
              onChange={(value) => setFormData({ ...formData, artist: value })}
              required
            >
              <Option value="">Select an artist</Option>
              {artists.map((artist) => (
                <Option key={artist._id} value={artist._id}>
                  {artist.name}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <label>Total Tracks</label>
            <Input
              type="number"
              name="total_tracks"
              value={formData.total_tracks}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Album Type</label>
            <Input
              type="text"
              name="album_type"
              value={formData.album_type}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Select Track</label>
            <Select
              name="trackId"
              value={formData.trackId}
              onChange={(value) => setFormData({ ...formData, trackId: value })}
              required
            >
              <Option value="">Select a track</Option>
              {tracks.map((track) => (
                <Option key={track._id} value={track._id}>
                  {track.name} by {track.artist}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <Button type="primary" htmlType="submit">
              Add Album
            </Button>
          </div>
        </form>

        {/* <Link to="/edit/album" className={`btn btn-primary `}>
          {" "}
          edit album
        </Link> */}
      </div>
    </>
  );
}

export default Album;














// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Input, Select, Button } from "antd";
// import { toast } from "react-toastify";
// import { useNavigate, Link } from "react-router-dom";

// const { Option } = Select;
// const enumValues = {
//   genre: ["Rock", "Hip hop", "Pop Music", "Country music", "Punk rock", "Christian/Gospel", "Indie rock", "Techno", "New wave", "Instrumental", "Reggae", "Rhythm", "Blue"],
// };
// const API_URL = "https://uplay.cyclic.cloud/";

// function Album() {
//   const initForm = {
//     total_tracks: 0,
//     image: null,
//     title: "",
//     release_date: "",
//     genre: "",
//     popularity: 0,
//     artist: "",
//     album_type: "",
//     trackIds: [],
//   };

//   const [formData, setFormData] = useState(initForm);
//   const [tracks, setTracks] = useState([]);
//   const [artists, setArtists] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     
//     axios
//       .get(`${API_URL}/api/track`)
//       .then((response) => {
//         setTracks(response.data.tracks);
//       })
//       .catch((error) => {
//         console.error("Error fetching tracks:", error);
//       });

//     axios
//       .get(`${API_URL}/api/artist`)
//       .then((response) => {
//         setArtists(response.data.artists);
//       })
//       .catch((error) => {
//         console.error("Error fetching artists:", error);
//       });
//   }, []);

//   const handleChange = (e) => {
//     const inputName = e.target.name;
//     const inputValue = e.target.value;
//     setFormData((prevForm) => ({ ...prevForm, [inputName]: inputValue }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prevForm) => ({ ...prevForm, image: file }));
//   };

//   const handleTrackCheckboxChange = (e) => {
//     const trackId = e.target.value;
//     const isChecked = e.target.checked;

//     setFormData((prevForm) => {
//       let updatedTrackIds = [...prevForm.trackIds];

//       if (isChecked) {
//         updatedTrackIds.push(trackId);
//       } else {
//         updatedTrackIds = updatedTrackIds.filter((id) => id !== trackId);
//       }

//       return { ...prevForm, trackIds: updatedTrackIds };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("image", formData.image);

//     Object.keys(formData).forEach((key) => {
//       if (
//         key !== "image" &&
//         key !== "trackIds" &&
//         formData[key] !== "" &&
//         formData[key] !== 0
//       ) {
//         formDataToSend.append(key, formData[key]);
//       }
//     });

//    
//     formDataToSend.append("trackIds", JSON.stringify(formData.trackIds));

//     try {
//       const response = await axios.post(`${API_URL}/api/album`, formDataToSend);
//       toast.success("Album Successfully uploaded", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: true,
//       });
//       navigate("/");
//     } catch (error) {
//       console.error("Error", error);
//       toast.error("An error occurred while uploading.", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: true,
//       });
//     }
//   };

//   return (
//     <>
//       <div>
//         <h3>Add Album</h3>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Title</label>
//             <Input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label>Image</label>
//             <Input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleFileChange}
//               required
//             />
//           </div>

//           <div>
//             <label>Release Date</label>
//             <Input
//               type="date"
//               name="release_date"
//               value={formData.release_date}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label>Genre</label>
//             <Select
//               name="genre"
//               value={formData.genre}
//               onChange={(value) => setFormData({ ...formData, genre: value })}
//               required
//             >
//               <Option value="">Select a genre</Option>
//               {enumValues.genre.map((genre) => (
//                 <Option key={genre} value={genre}>
//                   {genre}
//                 </Option>
//               ))}
//             </Select>
//           </div>

//           <div>
//             <label>Popularity</label>
//             <Input
//               type="number"
//               name="popularity"
//               value={formData.popularity}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label>Artist</label>
//             <Select
//               name="artist"
//               value={formData.artist}
//               onChange={(value) => setFormData({ ...formData, artist: value })}
//               required
//             >
//               <Option value="">Select an artist</Option>
//               {artists.map((artist) => (
//                 <Option key={artist._id} value={artist._id}>
//                   {artist.name}
//                 </Option>
//               ))}
//             </Select>
//           </div>

//           <div>
//             <label>Total Tracks</label>
//             <Input
//               type="number"
//               name="total_tracks"
//               value={formData.total_tracks}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label>Album Type</label>
//             <Input
//               type="text"
//               name="album_type"
//               value={formData.album_type}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label>Select Tracks</label>
//             <div>
//               {tracks.map((track) => (
//                 <div key={track._id}>
//                   <label>
//                     <input
//                       type="checkbox"
//                       name="trackIds"
//                       value={track._id}
//                       onChange={handleTrackCheckboxChange}
//                     />
//                     {track.name} by {track.artist}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <Button type="primary" htmlType="submit">
//               Add Album
//             </Button>
//           </div>
//         </form>

//         <Link to="/edit/album" className={`btn btn-primary `}>
//          
//           edit album
//         </Link>
//       </div>
//     </>
//   );
// }

// export default Album;




