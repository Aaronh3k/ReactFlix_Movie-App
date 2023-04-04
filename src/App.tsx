import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import MovieGrid from "./components/MovieGrid";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import MovieDetailsPage from "./components/MovieDetailsPage";
import PersonDetailsPage from "./components/PersonDetailsPage";
import HomePage from "./components/HomePage";
import TrendingPage from "./components/TrendingPage";

function AppContent() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
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
          <NavBar />
        </GridItem>
      )}
      <Show above="lg">
        {showAside && (
          <GridItem area={"aside"}>
            <GenreList onGenreSelect={setSelectedGenre} />
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
            element={<MovieGrid selectedGenreId={selectedGenre} />}
          />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
          <Route path="/person/:personId" element={<PersonDetailsPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/trending" element={<TrendingPage />} />
        </Routes>
      </GridItem>
    </Grid>
  );
}

function App() {
  return (
    <Router>
      <Box margin={0}>
        <AppContent />
      </Box>
    </Router>
  );
}

export default App;
