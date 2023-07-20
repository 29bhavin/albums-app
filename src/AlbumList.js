import { useRef} from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
function AlbumList(props) {
  const {albums, albumId, setAlbums, setAlbumId, setAlbumUpdate} = props;
  const albumTitleRef = useRef(null);
  const albumUserIdRef = useRef(null);

  // update albums state of albumUpdate
  let handleUpdate = (albumUp) => {
    setAlbumUpdate(albumUp);
  };

  //handle delete operation
  let handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: 'DELETE',
    });
    const deletedAlbums = albums.filter((album) => album.id !== id);
    alert('Album Deleted successfully');
    setAlbums(deletedAlbums);
  };

  //handle add operation 
  let addAlbum = (e) => {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      body: JSON.stringify({
        userId: albumUserIdRef.current.value,
        id: albumId,
        title: albumTitleRef.current.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("json",json));
    const album = [
        ...albums,
        {
      userId: albumUserIdRef.current.value,
      id: albumId,
      title: albumTitleRef.current.value,
        }
    ];
    setAlbums(album);
    setAlbumId(albumId + 1);
    albumUserIdRef.current.value = "";
    albumTitleRef.current.value = "";
    alert('Album Added Successfully!');
  };
  return (
    <>
    <Navbar/>
      <h1 className="list-title">Add Album</h1>
      <div className="list-card">
        <div className="card">
          <div className="card-details">
            <form onSubmit={addAlbum}>
              <div className="form-fields">
                <label className="form-label">Enter Album Name : </label>
                <input
                  placeholder="Album Name"
                  name="album-name"
                  ref={albumTitleRef}
                  onChange={(e) => console.log(e.target.value)}
                  required
                />
              </div>
              <div className="form-fields">
                <label className="form-label">Enter User Id :</label>
                <input
                  placeholder="User Id"
                  name="album-user-id"
                  ref={albumUserIdRef}
                  onChange={(e) => console.log(e.target.value)}
                  required
                />
              </div>
              <div className="form-fields">
                <label className="form-label">Id :</label>
                <input value={albumId} contentEditable={false} />
              </div>
              <div className="card-btns">
                <button className="update-btn">Add Album</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <h1 className="list-title">List of Albums</h1>
      <div className="list-card">
        {albums.map((album,i) => (
          <div className="card" key ={i}>
            <h1>{album.title}</h1>
            <div className="card-details">
              <span className="id">User Id : {album.userId}</span>
              <span className="id">Id : {album.id}</span>
            </div>
            <div className="card-btns">
              <Link to = "/update"><button
                className="update-btn"
                onClick={() => handleUpdate(album)}
              >
                Update
              </button></Link>
              <button
                className="delete-btn"
                onClick={() => handleDelete(album.id)}
              >
                Delete
              </button> 
            </div>
                
          </div>
        ))}
        
      </div>
    </>
  );
}

export default AlbumList;
