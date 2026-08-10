import './App.css'
import Search from './pages/Search';
import AlbumPage from "./pages/AlbumPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import { Routes, Route } from 'react-router-dom';
import Library from './pages/Library';


function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/library" element={<Library />} />
      </Routes>
    </>
  )
}

export default App
