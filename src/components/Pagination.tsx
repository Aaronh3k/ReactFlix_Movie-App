import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, onPageChange }: PaginationProps) => {
  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <HStack justifyContent="center" alignItems="center" mt={4} spacing={4}>
      <IconButton
        icon={<ChevronLeftIcon />}
        onClick={handlePrevious}
        isDisabled={currentPage === 1}
        aria-label="Previous Page"
      />
      <Box fontWeight="semibold">Page {currentPage}</Box>
      <IconButton
        icon={<ChevronRightIcon />}
        onClick={handleNext}
        aria-label="Next Page"
      />
    </HStack>
  );
};

export default Pagination;
