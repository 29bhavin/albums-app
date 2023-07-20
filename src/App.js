import AlbumList from "./AlbumList"
import { useState,useEffect } from "react";
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import UpdateAlbum from "./UpdateAlbum";
function App() {
  /*albums state to store albums,
  albumId to store id to increase album id in  Add album
  albumUpdate to store updated album*/

  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState(101);
  const [albumUpdate,setAlbumUpdate] =useState({});

  //useEffect to fecth album details from url
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => response.json())
      .then((json) => setAlbums(json));
  }, []);

  //Routers to set routes
  const router = createBrowserRouter([
    {
      path : "/",
      element : <AlbumList albums = {albums} albumId = {albumId} setAlbums = {setAlbums} setAlbumId = {setAlbumId}  setAlbumUpdate = {setAlbumUpdate}/>
    },
    {
      path : "/update",
      element : <UpdateAlbum albums = {albums}  setAlbums = {setAlbums} albumUpdate = {albumUpdate}/>
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
