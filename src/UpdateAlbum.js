import Navbar from "./Navbar";
import { useRef } from "react";
import { Link } from "react-router-dom";
export default function UpdateAlbum(props){
  const {albums, setAlbums, albumUpdate} = props;
  const albumTitleRef = useRef(null);
  const albumUserIdRef = useRef(null);
  
  //handle update operation 
  let updateAlbum = (oldAlbum) =>{
    let index = albums.indexOf(oldAlbum);
    fetch(`https://jsonplaceholder.typicode.com/albums/${oldAlbum.id}`, {
  method: 'PUT',
  body: JSON.stringify({
    userId: albumUserIdRef.current.value,
        id: oldAlbum.id,
        title: albumTitleRef.current.value,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => json);
albums[index] = {  userId: albumUserIdRef.current.value,
  id: oldAlbum.id,
  title: albumTitleRef.current.value,}
setAlbums(albums);
alert("Album Updated Successfully!");

  }

  return (
    <>
     <Navbar/>
      <h1 className="list-title">Update Album</h1>
      <div className="list-card">
        <div className="card">
          <div className="card-details">
            <form>
              <div className="form-fields">
                <label className="form-label">Update Album Name : </label>
                <input
                  placeholder="Album Name"
                  name="album-name"
                  ref={albumTitleRef}
                  defaultValue={albumUpdate.title}
                />
              </div>
              <div className="form-fields">
                <label className="form-label">Update User Id :</label>
                <input
                  placeholder="User Id"
                  name="album-user-id"
                  ref = {albumUserIdRef}
                  defaultValue={albumUpdate.userId}
                  required
                />
              </div>
              <div className="form-fields">
                <label className="form-label">Id :</label>
                <input value={albumUpdate.id} contentEditable={false} />
              </div>
              <div className="card-btns">
                <Link to = "/"><button className="update-btn" onClick={() => updateAlbum(albumUpdate)}>Update Album</button></Link>
                <Link to = "/"><button className="update-btn" >Back</button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}