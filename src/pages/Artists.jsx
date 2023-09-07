import React, { useState, useEffect } from "react";
import { Button, Table, Space, Popconfirm, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/artist`)
      .then((response) => {
        setArtists(response.data.artists);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

  const handleDelete = async (artistId) => {
    try {
     const prevArtists =  await axios.delete(`${API_URL}/api/artist/${artistId}`);
      message.success("Artist deleted successfully");
      setArtists(prevArtists)
      setArtists((prevArtists) =>
        prevArtists.filter((artist) => artist.artistId !== artistId)
      );
    } catch (error) {
      console.error("Error deleting artist:", error);
      message.error("An error occurred while deleting the artist");
    }
  };




  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      render: (genre) => genre.join(", "),
    },
    {
      title: "Popularity",
      dataIndex: "popularity",
      key: "popularity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          {/* <Button onClick={() => navigate(`/edit/artist/${record.artistId}`)}>Edit</Button> */}
         
          <Popconfirm
            title="Are you sure you want to delete this artist?"
            onConfirm={() => handleDelete(record.artistId)}
            okText="Yes"
            cancelText="No"
          >
             <Button type="danger">Delete</Button>
          </Popconfirm>
          <Link to={`/artist/${record.artistId}/album`}>View Albums</Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3>Artists</h3>
      {/* <Button type="primary" onClick={() => navigate("/add/artist")}>
        Add Artist
      </Button> */}
      <Table
        columns={columns}
        dataSource={artists}
        rowKey={(record) => record.artistId}
        loading={loading}
      />
    </div>
  );
}

export default Artists;








// import React, { useState, useEffect } from "react";
// import { Button, Table, Space, Popconfirm, message } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://localhost:5005";

// function Artists() {
//   const [artists, setArtists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/api/artist`)
//       .then((response) => {
//         setArtists(response.data.artists);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching artists:", error);
//       });
//   }, []);

//   const handleDelete = async (artistId) => {
//     try {
//       await axios.delete(`${API_URL}/api/artist/${artistId}`);
//       message.success("Artist deleted successfully");
//       setArtists((prevArtists) =>
//         prevArtists.filter((artist) => artist._id !== artistId)
//       );
//     } catch (error) {
//       console.error("Error deleting artist:", error);
//       message.error("An error occurred while deleting the artist");
//     }
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Genre",
//       dataIndex: "genre",
//       key: "genre",
//       render: (genre) => genre.join(", "),
//     },
//     {
//       title: "Popularity",
//       dataIndex: "popularity",
//       key: "popularity",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (text, record) => (
//         <Space size="middle">
//           <Button onClick={() => navigate(`/edit/artist/${record._id}`)}>Edit</Button>
//           <Popconfirm
//             title="Are you sure you want to delete this artist?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="danger">Delete</Button>
//           </Popconfirm>
//           <Link to={`/artist/${record._id}/albums`}>View Albums</Link>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <h3>Artists</h3>
//       <Button type="primary" onClick={() => navigate("/add/artist")}>
//         Add Artist
//       </Button>
//       <Table
//         columns={columns}
//         dataSource={artists}
//         rowKey={(record) => record._id}
//         loading={loading}
//       />
//     </div>
//   );
// }

// export default Artists;
