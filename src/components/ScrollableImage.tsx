import { Box, Image } from "@chakra-ui/react";

interface ScrollableImageProps {
  src: string;
  alt: string;
}

const ScrollableImage: React.FC<ScrollableImageProps> = ({
  src,
  alt,
  ...rest
}) => {
  return (
    <Box
      height={{ base: "300px", md: "50vh" }}
      overflowY="scroll"
      overflowX="hidden"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "gray.400",
          borderRadius: "8px",
        },
      }}
    >
      <Image src={src} alt={alt} width="100%" />
    </Box>
  );
};

export default ScrollableImage;
