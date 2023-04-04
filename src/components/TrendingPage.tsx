import React, { useState } from "react";
import useData from "../hooks/useData";
import { Dropdown } from "./Dropdown";

interface TrendingItem {
  id: number;
  title: string;
  original_title?: string;
  name?: string;
  media_type: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}

const TrendingPage: React.FC = () => {
  const [mediaType, setMediaType] = useState("all");
  const [timeWindow, setTimeWindow] = useState("week");
  const { data, error, isLoading } = useData<
    { results: TrendingItem[] },
    TrendingItem
  >(`/trending/${mediaType}/${timeWindow}`, "results");

  const handleMediaTypeChange = (value: string) => {
    setMediaType(value);
  };

  const handleTimeWindowChange = (value: string) => {
    setTimeWindow(value);
  };

  return (
    <div>
      <h1>Trending</h1>
      <div>
        <Dropdown
          label="Media Type"
          options={[
            { value: "all", label: "All" },
            { value: "movie", label: "Movies" },
            { value: "tv", label: "TV Shows" },
            { value: "person", label: "People" },
          ]}
          value={mediaType}
          onChange={handleMediaTypeChange}
        />
        <Dropdown
          label="Time Window"
          options={[
            { value: "day", label: "Today" },
            { value: "week", label: "This Week" },
          ]}
          value={timeWindow}
          onChange={handleTimeWindowChange}
        />
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h2>{item.title || item.original_title || item.name}</h2>
            <p>{item.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPage;
