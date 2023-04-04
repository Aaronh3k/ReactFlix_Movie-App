import React from "react";
import { Box } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box>
      <h1>Welcome to ReactFlix!</h1>
      <p>
        ReactFlix is your ultimate destination for movies and TV shows. Browse
        through our amazing collection of movies and TV shows, check out
        trending content, and add your favorites to your personal list.
      </p>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/movies">Movies</a>
        </li>
        <li>
          <a href="/tvshows">TV Shows</a>
        </li>
        <li>
          <a href="/trending">Trending</a>
        </li>
        <li>
          <a href="/favorites">Favorites</a>
        </li>
      </ul>
    </Box>
  );
};

export default HomePage;
