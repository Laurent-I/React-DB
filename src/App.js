import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // Handling Loading and data states
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //Using async and await
  const fetchMovieHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      //Sending a get Request with the Fetch API
      const response = await fetch("https://swapi.dev/api/films/");

      //handling http errors
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json;

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          opening_date: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (e) {
      //handling http errors
      setError(e.message);
    }
    setIsLoading(false);
  }, []);

  //Using useEffect for requests

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  //Handling Loading and data states

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
