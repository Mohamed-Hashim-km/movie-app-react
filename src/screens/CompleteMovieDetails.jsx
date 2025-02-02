import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ReactStars from "react-stars";
import YouTube from "react-youtube";
import Loader from "../components/Loader";

const CompleteMovieDetails = () => {
  const [movies, setMovies] = useState([]);
  const [movieVideo, setMovieVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  console.log(id);

  const MoviesDetailes = async (id) => {
    setIsLoading(true);
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e9c1a7bb4f4ab7c94cde3095cf896708`);
    const data = await response.json();
    console.log(data);

    setMovies(data);
    setIsLoading(false);
  };

  const MoviesVideoHandler = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=e9c1a7bb4f4ab7c94cde3095cf896708`);
    const data = await response.json();

    console.log(data);

    setMovieVideo(data.results[data.results.length - 1].key);
  };

  console.log(movieVideo);

  useEffect(() => {
    MoviesDetailes(id);
    MoviesVideoHandler(id);
  }, []);

  

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-gray h-[100vh] overflow-hidden">
          <Container fluid>
            <Row>
              <Col xs={6} className="m-0 p-0 rounded-lg hover:transition-all hover:duration-500 hover:transform hover:scale-105 hover:z-50 hover:filter shadow-lg">
                <img src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`} alt="Backdrop Image" className="brightness-[0.7] shadow-slate-200 h-[100vh] object-cover" />
              </Col>
              <Col xs={6} className=" shadow-slate-200 rounded-lg bg-gray m-0 p-0 brightness-110">
                <div className="mt-3  flex justify-center h-[50vh]">
                  <YouTube className=" " videoId={`${movieVideo}`} />
                </div>
                <div className="flex  justify-center ">
                  <h3 className="text-goldencolor uppercase ps-10 pe-5">{movies.title}</h3>
                </div>

                <ReactStars value={movies.vote_average / 2} className="ps-10 " />
                <div className="mb-1">
                  <span className="bg-slate-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800  ms-10">{movies.runtime} Minute</span>
                </div>
                <div className="ps-10 pb-1 text-wt">
                  <h5>
                    {movies.status}-<span className="text-sm">{movies.release_date}</span>{" "}
                  </h5>
                  <h5>{movies.tagline}</h5>
                </div>
                <div className="flex  justify-center ps-10 pe-10">
                  <h6 className="text-wt">{movies.overview}</h6>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default CompleteMovieDetails;
