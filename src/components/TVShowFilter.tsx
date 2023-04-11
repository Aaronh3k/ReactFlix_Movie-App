import { Select } from "@chakra-ui/react";

interface TVShowFilterProps {
  onFilterChange: (filter: string) => void;
}

const TVShowFilter = ({ onFilterChange }: TVShowFilterProps) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  };

  return (
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
      <option value="airing_today">Airing Today</option>
      <option value="on_the_air">On the Air</option>
      <option value="top_rated">Top Rated</option>
    </Select>
  );
};

export default TVShowFilter;
