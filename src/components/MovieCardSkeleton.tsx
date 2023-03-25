import { Card, CardBody, Skeleton, HStack } from "@chakra-ui/react";

const MovieCardSkeleton = () => {
  return (
    <Card
      width="300px"
      maxW="sm"
      borderRadius={10}
      boxShadow="md"
      overflow="hidden"
      _hover={{ boxShadow: "lg" }}
    >
      <Skeleton height="200px" startColor="gray.100" endColor="gray.300" />
      <CardBody>
        <HStack justifyContent="space-between">
          <Skeleton height="20px" width="60%" borderRadius="md" />
          <Skeleton height="20px" width="30px" borderRadius="full" />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default MovieCardSkeleton;
