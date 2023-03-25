import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Movie {
  id: number;
  original_title: string;
}

interface FetchMoviesResponse {
  count: number;
  results: Movie[];
}

const MovieGrid = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchMoviesResponse>("/movie/popular")
      .then((res) => setMovies(res.data.results))
      .catch((err) => setError(err.message));
  }, []); // Add an empty dependency array

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.original_title}</li>
        ))}
      </ul>
    </>
  );
};

export default MovieGrid;
