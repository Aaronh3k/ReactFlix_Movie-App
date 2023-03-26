import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import MovieGrid from "./components/MovieGrid";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

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
        <GridItem area={"aside"}>
          <GenreList
            onGenreSelect={(genreId: number) => setSelectedGenre(genreId)}
          />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <MovieGrid selectedGenreId={selectedGenre} />
      </GridItem>
    </Grid>
  );
}

export default App;
