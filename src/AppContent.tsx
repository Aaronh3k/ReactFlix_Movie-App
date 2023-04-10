import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import MovieGrid from "./components/MovieGrid";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import { Route, Routes } from "react-router-dom";
import MovieDetailsPage from "./components/MovieDetailsPage";
import PersonDetailsPage from "./components/PersonDetailsPage";
import HomePage from "./components/HomePage";
import TrendingPage from "./components/TrendingPage";
import TVShowGrid from "./components/TVShowGrid";
import TVShowDetailsPage from "./components/TVShowDetailsPage";
import PeopleGrid from "./components/PeopleGrid";
import Account from "./components/Account";

interface AppContentProps {
  session: any;
}

const AppContent: React.FC<AppContentProps> = ({ session }) => {
  const [selectedMovieGenre, setSelectedMovieGenre] = useState<number | null>(
    null
  );
  const [selectedTVShowGenre, setSelectedTVShowGenre] = useState<number | null>(
    null
  );
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isMoviesPage = location.pathname === "/movies";
  const isTvShowsPage = location.pathname === "/tvshows";
  const showAside = isMoviesPage || isTvShowsPage;

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: showAside ? "minmax(200px, auto) 1fr" : "1fr",
      }}
    >
      {!isHomePage && (
        <GridItem area={"nav"}>
          <NavBar session={session} />
        </GridItem>
      )}
      <Show above="lg">
        {showAside && (
          <GridItem area={"aside"}>
            {isMoviesPage ? (
              <GenreList type="movie" onGenreSelect={setSelectedMovieGenre} />
            ) : (
              <GenreList type="tv" onGenreSelect={setSelectedTVShowGenre} />
            )}
          </GridItem>
        )}
      </Show>
      <GridItem
        area={"main"}
        colStart={{ base: 1, lg: isHomePage ? 1 : 2 }}
        colEnd={{ base: 2, lg: 3 }}
      >
        <Routes>
          <Route
            path="/movies"
            element={<MovieGrid selectedGenreId={selectedMovieGenre} />}
          />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
          <Route path="/person/:personId" element={<PersonDetailsPage />} />
          <Route path="/" element={<HomePage session={session} />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route
            path="/tvshows"
            element={<TVShowGrid selectedGenreId={selectedTVShowGenre} />}
          />
          <Route path="/tvshow/:tvId" element={<TVShowDetailsPage />} />
          <Route path="/people" element={<PeopleGrid />} />
          <Route path="/account" element={<Account session={session} />} />
        </Routes>
      </GridItem>
    </Grid>
  );
};

export default AppContent;