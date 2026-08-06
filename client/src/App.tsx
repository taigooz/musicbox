import './App.css'
import Search from './pages/Search';
import AlbumPage from "./pages/AlbumPage";
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/album/:id" element={<AlbumPage />} />
      </Routes>
    </>
  )
}

export default App
