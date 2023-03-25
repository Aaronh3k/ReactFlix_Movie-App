import { Badge } from "@chakra-ui/react";

interface props {
  score: number;
}

const getBadgeColorScheme = (score: number) => {
  if (score >= 7) {
    return "green";
  } else if (score >= 5) {
    return "orange";
  } else {
    return "red";
  }
};

const VoteAverage = ({ score }: props) => {
  const colorScheme = getBadgeColorScheme(score);

  return (
    <Badge
      fontSize="14px"
      borderRadius="4px"
      colorScheme={colorScheme}
      px={2}
      py={1}
    >
      {score}
    </Badge>
  );
};

export default VoteAverage;
