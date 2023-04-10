import { Select, Box } from "@chakra-ui/react";

interface MovieFilterProps {
  onFilterChange: (filter: string) => void;
}

const MovieFilter = ({ onFilterChange }: MovieFilterProps) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <Box
      position="absolute"
      top="5rem"
      right="3rem"
      zIndex={10}
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
    >
      <Select
        defaultValue="popular"
        onChange={handleFilterChange}
        width="fit-content"
        borderRadius="0"
        colorScheme="blue"
        fontWeight="semibold"
        userSelect="none"
        _focus={{
          outline: "none",
          boxShadow: "none",
        }}
        _hover={{
          bg: "blue.600",
          color: "white",
        }}
      >
        <option value="popular">Popular</option>
        <option value="now_playing">Now Playing</option>
        <option value="top_rated">Top Rated</option>
        <option value="upcoming">Upcoming</option>
      </Select>
    </Box>
  );
};

export default MovieFilter;
