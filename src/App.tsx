import { useState } from 'react';
import './App.css'
import AlbumCard from './components/AlbumCard'

const albums = [
  {
    title: 'OK Computer',
    artist: 'Radiohead',
    year: 1997,
  },
  {
    title: 'The Dark Side of the Moon',
    artist: 'Pink Floyd',
    year: 1973,
  },
  {
    title: 'Abbey Road',
    artist: 'The Beatles',
    year: 1969,
  },
  {
    title: 'Thriller',
    artist: 'Michael Jackson',
    year: 1982,
  }
];

function App() {
  const [search, setSearch] = useState('');

  return (
    <>

      <h1>musicbox</h1>
      
      <input 
        type="text"
        placeholder="Search for music..." 
        onChange={ (e) => setSearch(e.target.value) }
      />



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
