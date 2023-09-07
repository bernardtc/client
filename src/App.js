import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Album from "./components/admin/AddAlbum";
import AddTrack from "./components/admin/AddTrack";
import AlbumList from "./pages/AlbumList";
// import IsPrivate from "./components/IsPrivate"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHome from "./components/admin/AdminHome";
import AddArtist from "./components/admin/AddArtist";
import TrackList from "./pages/TrackList";
import Playlist from "./pages/Playlist";
import CreatePlaylist from "./pages/CreatePlaylist";
import EditAlbum from "./components/admin/EditAlbum";
import EditTrack from "./components/admin/EditTrack";
import ArtistList from "./pages/Artists";
import ArtistAlbums from "./pages/ArtistAlbum";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/artist" element={<ArtistList/>} />
      <Route path="/artist/:artistId/albums" element={<ArtistAlbums />} />
      <Route path="/edit/track/:trackId" element={<EditTrack/>} />
      <Route path="/edit/album/:albumId" element={<EditAlbum/>} />
      <Route path="/create/playlist" element={<CreatePlaylist/>} />
      <Route path="/album/:albumId" element={<TrackList/>} />
      <Route path="/admin" element={<AdminHome/>}/>
      <Route path="/add/artist" element={<AddArtist/>}/>
      <Route path="/track" element={<AddTrack/>}/>
      <Route path="/album/list" element={<AlbumList/>}/>
        <Route path="/album" element={<Album/>}/>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;






         


         


