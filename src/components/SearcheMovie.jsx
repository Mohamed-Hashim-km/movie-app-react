import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const SearchedMovie = () => {
  const [movies, setMovies] = useState([]);
  const [serchedValues, setserchedValues] = useState([]);
  const searchInputValue = useRef();
  const navigate = useNavigate();

  const SearchMovies = async (serchedValues) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${serchedValues}&api_key=e9c1a7bb4f4ab7c94cde3095cf896708`);
    const data = await response.json();
    setMovies(data.results);
  };

  const SearchHandler = () => {
    setserchedValues(searchInputValue.current.value.replace(" ", "+"));
  };

  useEffect(() => {
    SearchMovies(serchedValues);
  }, [serchedValues]);

  const MovieIdHandler = (id) => {
    navigate(`/movieDetailse/${id}`);
  };

  return (
    <>
      <div
        className="min-h-[100vh] pb-[20px]"
        style={{
          backgroundImage: "url('https://static.turbosquid.com/Preview/2014/05/26__02_29_15/Filmreel_cam1.jpg888f99da-c07e-41cd-99c6-9e8465b4ff30Original.jpg')",
          backgroundRepeat: "no-repeat",
          width: "100%",
          backgroundSize: "100% auto",
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-center">
          <div className="flex px-4 py-2 rounded-md border-2 border-white w-[90vh]  overflow-hidden max-w-md mx-auto font-[sans-serif]">
            <input onChange={SearchHandler} ref={searchInputValue} placeholder="Search Movies..." className="w-full outline-none bg-transparent text-wt text-sm" />
            <button onClick={SearchHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white text-white">
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </button>
          </div>
        </div>
        {/* <div className="flex justify-center pt-4  ">
          <div className="flex px-4 py-3 rounded-md border-2 border-white w-[90%]  overflow-hidden max-w-md mx-auto font-[sans-serif]">
            <input ref={searchInputValue}  placeholder="Search Movies..." className="w-full outline-none bg-transparent text-wt text-sm" />
            <button onClick={SearchHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white text-white">
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </button>
          </div>
        </div> */}
        <div className="w-[100%] pt-4 ml-7 h-[100%] overflow-hidden">
          <div className="flex-wrap flex w-[100%] gap-2  ">
            {movies.map((item, index) => {
              return (
                <Card style={{ width: "18rem" }} key={index} className="hover:transition-all hover:duration-500 hover:transform hover:scale-75 hover:z-50 hover:filter hover:ease-in duration-500">
                  <button onClick={() => MovieIdHandler(item.id)}>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} />
                  </button>
                  <Card.Body className="rounded-b-lg bg-black border-white">
                    <Card.Title className="truncate text-white">{item.title}</Card.Title>
                    <Card.Text className="text-white">{item.release_date}</Card.Text>
                    <Card.Text>
                      <ReactStars value={item.vote_average / 2} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedMovie;
