import { SimpleGrid } from "@chakra-ui/react";
import usePeople from "../hooks/usePeople";
import PersonCard from "./PersonCard";

const PeopleGrid = () => {
  const { people, error, isLoading } = usePeople();

  return (
    <>
      {error && <p>Error: {error}</p>}
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
    </>
  );
};

export default PeopleGrid;
