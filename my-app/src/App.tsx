import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MovieList from './components/MovieList';
import ActorList from './components/ActorList';
import ActorDetails from './components/ActorDetails';
import MovieDetails from './components/MovieDetails';
import SearchResults from './components/SearchResults';
import Navbar from './components/Navbar';
import HomePage from './components/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/what2watch" element={<HomePage />} />
        <Route path="/movielist" element={<MovieList />} />
        <Route path="/actorlist" element={<ActorList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/actor/:id" element={<ActorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
