import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  userId: string | null;
  email: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (email: string, password: string, name: string) => Promise<void>;
  handleLogout: () => void;
}

const AppContent: React.FC<AppContentProps> = ({ session, userId, email, handleLogin, handleLogout, handleRegister }) => {
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
  <NavBar session={session} handleLogout={handleLogout} />
</GridItem>

      )}
      <GridItem area={"main"}>
      <Routes>
      <Route
        path="/movies"
        element={<MovieGrid userId={userId} />}
      />
      <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
      <Route path="/person/:personId" element={<PersonDetailsPage />} />
      <Route path="/" element={<HomePage session={session} handleLogin={handleLogin} handleRegister={handleRegister} />} />
      <Route path="/trending" element={<TrendingPage />} />
      <Route path="/tvshows" element={<TVShowGrid />} />
      <Route path="/tvshow/:tvId" element={<TVShowDetailsPage />} />
      <Route path="/people" element={<PeopleGrid />} />
      <Route path="/account" element={<Account userId={userId} email={email} />} />
      <Route
        path="/favorites"
        element={<FavoritesGrid userId={userId} />}
      />
    </Routes>
      </GridItem>
    </Grid>
  );
};

export default AppContent;