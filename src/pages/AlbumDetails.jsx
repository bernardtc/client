import { Card, Col } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./AlbumDetails.css";

const AlbumDetail = ({ album, refreshAlbumList }) => {
  const API_URL = "http://localhost:5005";

  const deleteAlbum = async (albumId) => {
    try {
      const response = await axios.delete(`${API_URL}/api/album/${albumId}`);
      console.log("Deleted", response.data);
      toast.success("Album deleted successfully.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });

      
      refreshAlbumList();
    } catch (error) {
      console.error("Error", error);
      toast.error("An error occurred while deleting album.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });
    }
  };

  return (
    <div>
      <Col>
        <Link to={`/album/${album._id}`}>
        <Card
                    title={album.title}
                    style={{ width: 230, height: 300, margin: 10 }}
                  >
                    <img src={album.image} alt="" height={150} />
                 
            <ul className="album-info">
              <li>Total Tracks: {album.total_tracks}</li>
              <li>Release Date: {album.release_date}</li>
              <li>Genre: {album.genre}</li>
              <li>Popularity: {album.popularity}</li>
              <li>Artist: {album.artist}</li>
              <li>Album Type: {album.album_type}</li>
            </ul>
          </Card>
        </Link>
      </Col>

      <div>
      <button className="delete-button" onClick={() => deleteAlbum(album._id)}>
        Delete from Library
      </button>
      </div>
      <div>
      <Link to={`/edit/album/${album._id}`}>
          <button className="edit-button">Edit Album</button>
        </Link>
      </div>
     


    </div>
  );
};

export default AlbumDetail;
