import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

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

  console.table(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/* several row_poster(s) */}

        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {/*container -> posters*/}
    </div>
  );
}

export default Row;
