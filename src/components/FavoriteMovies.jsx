import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import Loader from "./Loader";

const FavoriteMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(true)
  
  
  


  // console.log(step1);

  const navigate=useNavigate()

  const FavoriteMovies = async () => {
    setIsLoading(false)
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=e9c1a7bb4f4ab7c94cde3095cf896708`);
    const data = await response.json();
    setMovies(data.results);
    setIsLoading(false)
  };

  useEffect(() => {
    FavoriteMovies();
  }, []);

  const MovieIdHandler=(id)=>{
    console.log(id);
    navigate(`/movieDetailse/${id}`)
    
 }

 const {value}=useParams()
 console.log( typeof value);
 

 

  return (
    <>
    <div className=" flex overflow-scroll">
     {isLoading?<><Loader /></> :
   <div className="flex flex-wrap gap-2 mt-2 ml-8">
      {movies.map((item,index) => {
        return (
          <div key={index}>
            <Card style={{ width: "18rem", height: "30%" }} className="bg-black hover:transition-all hover:duration-500 hover:transform hover:scale-75 hover:z-50 hover:filter hover:ease-in duration-500" >
            <button onClick={()=>MovieIdHandler(item.id)}>
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} />
              </button>
              <Card.Body>
                <Card.Title className="text-white truncate">{item.title}</Card.Title>
                <Card.Text className="text-white">{item.release_date}</Card.Text>
                <Card.Text>
                <ReactStars value={item.vote_average / 2} />
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        );
      })}
      </div>
      

   

    }
      </div>
      
    </>

  );
};

export default FavoriteMovies;
