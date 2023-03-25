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
      <Skeleton height="200px" />
      <CardBody>
        <HStack justifyContent="space-between">
          <Skeleton height="20px" width="60%" />
          <Skeleton height="20px" width="30px" />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default MovieCardSkeleton;
