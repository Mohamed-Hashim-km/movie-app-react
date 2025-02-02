import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import TrendingMovies from "../components/TrendingMovies.jsx";
import FavoriteMovies from "../components/FavoriteMovies.jsx";
import { useNavigate } from "react-router-dom";
import RatedMovie from "../components/RatedMovie.jsx";
import { IoMdArrowDropright } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Loader from "../components/Loader.jsx";
import FavoriteMovie from "../components/wrap/F.jsx";
import TrendingMovie from "../components/wrap/T.jsx";
import RatedMovies from "../components/wrap/R.jsx";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isTrendingShowMore, setIsTrendingShowMore] = useState(true);
  const [isRatedShowMore, setIsRatedShowMore] = useState(true);
  const [isFavoriteShowMore, setIsFavoriteShowMore] = useState(true);
  const [loader, setLoader] = useState(true);
  console.log(isTrendingShowMore);

  const navigate = useNavigate();

  const RecentReleasedMovie = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e9c1a7bb4f4ab7c94cde3095cf896708`);
    const data = await response.json();
    setMovies(data.results);
  };

  const MovieIdHandler = (id) => {
    navigate(`/movieDetailse/${id}`);
  };

  useEffect(() => {
    RecentReleasedMovie();
  }, []);

  return (
    <>
      <div className="min-h-[100vh]">
        {movies == "" ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className="overflow-hidden ">
              <div className="pb-[30px] " id="home">
                <div>
                  <Carousel fade data-bs-theme="dark ">
                    {movies.map((item, index) => {
                      return (
                        <Carousel.Item key={index} className="hidden">
                          <button className="w-100 h-[100vh] cursor-pointer" onClick={() => MovieIdHandler(item.id)}>
                            <img className="d-block w-100 h-[100vh] cursor-pointer object-cover" src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt="First slide" />
                          </button>
                          <Carousel.Caption>
                            <h2 className="text-red font-extrabold uppercase">{item.original_title}</h2>
                            <h5 className="text-white font-extrabold">
                              <span>{item.release_date}</span>
                            </h5>
                            <span>{item.overview}</span>
                          </Carousel.Caption>
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </div>

                {/* ==============================FAVORITE MOVIES================================= */}
                <div className="mt-3 flex justify-between" id="Favorite">
                  <h1 className="text-goldencolor ms-2">FAVORITE MOVIES</h1>
                  <div className="flex items-center align-middle">
                    <button onClick={() => setIsFavoriteShowMore(!isFavoriteShowMore)} className="text-white">
                      VIEW ALL
                    </button>
                    {isFavoriteShowMore ? <IoMdArrowDropright className="text-teal-100  font-extrabold text-lg" /> : <MdOutlineArrowDropDown className="text-teal-100  font-extrabold text-lg" />}
                  </div>
                </div>
                  
               

                {isFavoriteShowMore?<FavoriteMovie/>:<FavoriteMovies />}

              

                {/* ==============================TRENDING MOVIES================================= */}
                <div className="mt-1  flex justify-between" id="Trending">
                  <h1 className="text-goldencolor ms-2">TRENDING MOVIES</h1>
                  <div className="flex items-center align-middle">
                    <button onClick={() => setIsTrendingShowMore(!isTrendingShowMore)} className="text-white">
                      VIEW ALL
                    </button>
                    {isTrendingShowMore ? <IoMdArrowDropright className="text-teal-100  font-extrabold text-lg" /> : <MdOutlineArrowDropDown className="text-teal-100  font-extrabold text-lg" />}
                  </div>
                </div>

               
                {isTrendingShowMore?<TrendingMovie/>:<TrendingMovies />}

                {/* ==============================RATED MOVIES================================= */}
                <div className="mt-3 flex justify-between">
                  <h1 className="text-goldencolor ms-2" id="Rated">
                    RATED MOVIES
                  </h1>
                  <div className="flex items-center align-middle">
                    <button onClick={() => setIsRatedShowMore(!isRatedShowMore)} className="text-white">
                      VIEW ALL
                    </button>
                    {isRatedShowMore ? <IoMdArrowDropright className="text-teal-100  font-extrabold text-lg" /> : <MdOutlineArrowDropDown className="text-teal-100  font-extrabold text-lg" />}
                  </div>
                </div>
                
                {isRatedShowMore? <RatedMovies/>:  <RatedMovie/>}
              
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
