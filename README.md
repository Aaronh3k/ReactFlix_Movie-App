# Enterprise Web Development - Assignment 1

## ReactFlix - Overview

ReactFlix is an enterprise-level web development project aimed at creating a comprehensive movie application showcasing popular movies, TV shows, and people (artists). The application is built as a React Single Page Application (SPA) using a modern technology stack:

- **Vite**: A build tool and development server that provides a faster and leaner development experience compared to traditional bundlers.
- **React**: A JavaScript library for building user interfaces, powering the SPA architecture.
- **TypeScript**: A statically typed superset of JavaScript that adds optional types, enabling better developer tooling and safer code.
- **Chakra UI**: A modular and accessible component library for React, providing a consistent design system for the application.

For backend services, ReactFlix uses Supabase, an open-source Firebase alternative. Supabase offers a suite of services that include:

- **Authentication**: User authentication is managed using Supabase, which provides secure and scalable solutions for user management.
- **Storage**: Supabase storage is utilized for handling user avatars and other media assets.
- **Postgres Database**: Supabase's integrated Postgres database is leveraged for managing user favorites and profiles.

ReactFlix retrieves movie data from the TMDB API, a popular and comprehensive movie database. This API allows the application to fetch information about movies, TV shows, and people (artists), as well as related metadata.

The application is deployed on Vercel, a platform for frontend applications that provides seamless deployment, automatic SSL, and global CDN capabilities. This ensures that ReactFlix is accessible, fast, and secure for users around the globe.

## Feature's

- Dynamic landing page featuring background images, welcome text, and navigation buttons for key sections. Accessible only to authenticated users, with a SignIn component for guests.
- Comprehensive movie browsing experience with a responsive grid layout, filtering, search functionality, and visually appealing cards that include favoriting and detailed movie information on hover.
- Comprehensive movie details page featuring:
  - Movie title, release date, runtime, and rating.
  - Genres displayed as badges for easy identification.
  - Overview section with a brief description of the movie.
  - Cast section, showcasing top cast members with their profile pictures and character names.
  - Expandable movie images section with a smooth scrolling experience and a toggle button for easy navigation.
  - Review slider displaying user reviews with their author, rating, and submission date.
  - Responsive design, adapting to different screen sizes and devices.
  - Seamless integration with external API for fetching movie data, credits, images, and reviews.
- Dynamic TV show browsing experience with a responsive grid layout, filtering, search functionality, and visually appealing cards that include TV show details on hover.
- Displaying TV show details, cast, reviews, and images with expandable functionality.
- A searchable and filterable grid of people's information, with pagination and clickable cards to access individual details.
- Detailed information page about a person, including their bio, known-for details, and a list of their movie and TV show credits with an option to show more.
- A grid of favorite movies that displays movie cards with title, rating, and poster image. Supports adding and removing movies to and from a user's favorites list using a heart-shaped button that changes color on click.
- A profile page with form inputs for updating user information, avatar upload with preview, and editing functionality. Uses Supabase for data management.
- A Responsive navigation bar with links to key sections of the website and a color mode switch, as well as icons and text for account management and sign out.
- A Trending page with a responsive grid layout of trending items, including movies, TV shows, and people. Provides filtering options for media type and time window, and features smooth navigation to individual pages with detailed information about each item.
