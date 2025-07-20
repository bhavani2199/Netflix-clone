import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    //if [], run once when the row loads, and dont run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      // If a trailer is already open, close it
      setTrailerUrl("");
    } else {
      // Try to find the trailer for the selected movie
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          // Example returned URL: https://www.youtube.com/watch?v=abc123
          const urlParams = new URLSearchParams(new URL(url).search);
          const videoId = urlParams.get("v"); // Extract "abc123"
          setTrailerUrl(videoId); // Set this as the trailer to display
        })
        .catch((error) => console.log("Trailer not found", error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/* several row_poster(s) */}

        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
