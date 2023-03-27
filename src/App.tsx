import { Grid, GridItem, Show } from "@chakra-ui/react";
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

function AppContent() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area={"nav"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        {isHomePage && (
          <GridItem area={"aside"}>
            <GenreList onGenreSelect={setSelectedGenre} />
          </GridItem>
        )}
      </Show>
      <GridItem area={"main"}>
        <Routes>
          <Route
            path="/"
            element={<MovieGrid selectedGenreId={selectedGenre} />}
          />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
        </Routes>
      </GridItem>
    </Grid>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
