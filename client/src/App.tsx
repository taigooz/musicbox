import './App.css'
import Search from './pages/Search';
import AlbumPage from "./pages/AlbumPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import { Routes, Route } from 'react-router-dom';
import Library from './pages/Library';
import ProfilePage from './pages/ProfilePage';


function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/library" element={<Library />} />
          <Route path="*" element={<h1>404 — Page Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
