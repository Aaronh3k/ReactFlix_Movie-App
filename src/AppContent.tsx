import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import MovieGrid from "./components/MovieGrid";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import MovieDetailsPage from "./components/MovieDetailsPage";
import PersonDetailsPage from "./components/PersonDetailsPage";
import HomePage from "./components/HomePage";
import TrendingPage from "./components/TrendingPage";
import TVShowGrid from "./components/TVShowGrid";
import TVShowDetailsPage from "./components/TVShowDetailsPage";
import PeopleGrid from "./components/PeopleGrid";
import Account from "./components/Account";
import FavoritesGrid from "./components/FavoritesGrid";

interface AppContentProps {
  session: any;
}

const AppContent: React.FC<AppContentProps> = ({ session }) => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "main main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "1fr",
      }}
      gap={{ base: 0, lg: isHomePage ? 0 : 4 }}
    >
      {!isHomePage && (
        <GridItem area={"nav"}>
          <NavBar session={session} />
        </GridItem>
      )}
      <GridItem area={"main"}>
        <Routes>
          <Route
            path="/movies"
            element={<MovieGrid userId={session?.user?.id} />}
          />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
          <Route path="/person/:personId" element={<PersonDetailsPage />} />
          <Route path="/" element={<HomePage session={session} />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/tvshows" element={<TVShowGrid />} />
          <Route path="/tvshow/:tvId" element={<TVShowDetailsPage />} />
          <Route path="/people" element={<PeopleGrid />} />
          <Route path="/account" element={<Account session={session} />} />
          <Route
            path="/favorites"
            element={<FavoritesGrid userId={session?.user?.id} />}
          />
        </Routes>
      </GridItem>
    </Grid>
  );
};

export default AppContent;
