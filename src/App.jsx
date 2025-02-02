import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./screens/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import SearcheMovie from "./components/SearcheMovie";
import CompleteMovieDetails from "./screens/CompleteMovieDetails";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import FavoriteMovies from "./components/FavoriteMovies";
import TrendingMovies from "./components/TrendingMovies";
import RatedMovie from "./components/RatedMovie";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movieSearch" element={<SearcheMovie />} />
        <Route path="/movieDetailse/:id" element={<CompleteMovieDetails />} />
        <Route path="/trending/:value" element={<TrendingMovies/>} />
        <Route path="/rated/:value" element={<RatedMovie/>} />
        <Route path="/favorite/:value" element={<FavoriteMovies/>} />


      </Routes>
      <Footer />
    </>
  );
}

export default App;
