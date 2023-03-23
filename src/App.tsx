import { Grid, GridItem, Show } from "@chakra-ui/react";
import MovieGrid from "./components/MovieGrid";
import NavBar from "./components/NavBar";

function App() {
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
        <GridItem area={"aside"}>Aside</GridItem>
      </Show>
      <GridItem area={"main"}>
        <MovieGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
