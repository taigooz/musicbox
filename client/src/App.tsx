import './App.css'
import Search from './pages/Search';
import AlbumPage from "./pages/AlbumPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import { Routes, Route } from 'react-router-dom';
import Library from './pages/Library';
import ProfilePage from './pages/ProfilePage';
import ProfileAlbums from './components/profile/ProfileAlbums';
import ProfileLists from './components/profile/ProfileLists';
import ProfileOverview from './components/profile/ProfileOverview';
import ProfileReviews from './components/profile/ProfileReviews';
import ProfileSpins from './components/profile/ProfileSpins';


function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Search />} /> 


          <Route path="/profile" element={<ProfilePage />}>
            <Route index element={<ProfileOverview />} />
            <Route path="albums" element={<ProfileAlbums />} />
            <Route path="reviews" element={<ProfileReviews />} />
            <Route path="spins" element={<ProfileSpins />} />
            <Route path="lists" element={<ProfileLists />} />
          </Route>


          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/library" element={<Library />} />
          <Route path="*" element={<h1>404 — Page Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
