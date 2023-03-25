import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

const MovieCardContainer = ({ children }: props) => {
  return (
    <Box
      width="300px"
      maxW="sm"
      borderRadius={10}
      boxShadow="md"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.1)", boxShadow: "xl" }}
    >
      {children}
    </Box>
  );
};

export default MovieCardContainer;
