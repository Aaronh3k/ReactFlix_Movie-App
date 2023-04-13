import React from "react";
import {
  Box,
  VStack,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  HStack,
  Image,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { FaRegComments } from "react-icons/fa";
import useMovieReviews from "../hooks/useMovieReviews";
import { formatDistanceToNow } from "date-fns";
import useTVShowReviews from "../hooks/useTVShowReviews";

export interface Review {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  [key: string]: any;
}

const ReviewSlider = ({
  mediaId,
  mediaType,
}: {
  mediaId: number;
  mediaType: "movie" | "tv";
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let reviewsData;
  if (mediaType === "movie") {
    reviewsData = useMovieReviews(mediaId);
  } else {
    reviewsData = useTVShowReviews(mediaId);
  }

  const { data: reviews, isLoading, error } = reviewsData;

  const handleOpen = () => {
    if (!isOpen) {
      onOpen();
    }
  };

  const defaultAvatar = "https://via.placeholder.com/150x150?text=No%20Avatar";

  return (
    <>
      <Box
        as="button"
        onClick={handleOpen}
        p={2}
        borderRadius="md"
        fontSize="lg"
        display="flex"
        alignItems="center"
      >
        <FaRegComments />
        <Text ml={1}>Reviews</Text>
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Reviews</DrawerHeader>
          <DrawerBody>
            {isLoading && <Text>Loading...</Text>}
            {error && <Text>Error: {error}</Text>}
            {reviews &&
              reviews.map(
                (review: Review): JSX.Element => (
                  <VStack key={review.id} align="start" spacing={4}>
                    <HStack>
                      {review.author_details.avatar_path && (
                        <Image
                          src={
                            review.author_details.avatar_path.startsWith("http")
                              ? review.author_details.avatar_path
                              : `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
                          }
                          alt={`${review.author}'s avatar`}
                          boxSize="40px"
                          borderRadius="full"
                        />
                      )}
                      <VStack align="start">
                        <Text fontWeight="bold">{review.author}</Text>
                        <Text fontSize="sm">
                          {review.author_details.rating !== null &&
                            `Rating: ${review.author_details.rating}`}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {formatDistanceToNow(new Date(review.created_at), {
                            addSuffix: true,
                          })}
                        </Text>
                      </VStack>
                      <Spacer />
                    </HStack>
                    <Text>{review.content}</Text>
                    <Divider />
                  </VStack>
                )
              )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ReviewSlider;
