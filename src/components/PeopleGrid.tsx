import { Box, Flex, Input, SimpleGrid, Text, Select } from "@chakra-ui/react";
import { useState } from "react";
import usePeople from "../hooks/usePeople";
import PersonCard from "./PersonCard";
import Pagination from "./Pagination";

const PeopleGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("popular");
  const [searchTerm, setSearchTerm] = useState("");
  const { people, error, isLoading } = usePeople(
    filter,
    searchTerm,
    currentPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding="10px"
        userSelect="none"
      >
        <Box>
          <Input
            placeholder="Search People"
            value={searchTerm}
            onChange={handleSearch}
            width={{ base: "60%", sm: "auto" }}
            borderColor="blue.500"
            borderRadius="full"
            focusBorderColor="blue.500"
            _placeholder={{ color: "gray.500" }}
          />
        </Box>
      </Flex>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={10}
        padding="10px"
      >
        {isLoading && <p>Loading...</p>}
        {people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </SimpleGrid>
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};

export default PeopleGrid;
