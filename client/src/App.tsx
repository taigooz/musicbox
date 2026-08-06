import { useState } from 'react';
import './App.css'
import AlbumCard from './components/AlbumCard'
import type { Album } from './types/album';



function App() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [search, setSearch] = useState('');

  const searchAlbums = async () => {
    const response = await fetch(`http://localhost:3000/api/albums/search?term=${search}`);
    const data = await response.json();
    console.log(data);
  }
  return (
    <>

      <h1>musicbox</h1>
      
      <input 
        type="text"
        placeholder="Search for music..." 
        onChange={ (e) => setSearch(e.target.value) }
      />

      <button onClick={searchAlbums}>
        Search
      </button>


      <p>No albums saved yet. Also: search = {search}</p>

      {search && albums
        .filter((album) =>
          album.title.toLowerCase().includes(search.toLowerCase()) ||
          album.artist.toLowerCase().includes(search.toLowerCase())
        )
        .map((album) => (
          <AlbumCard key={album.title} album={album} />
        ))}
    </>
  )
}

export default App
