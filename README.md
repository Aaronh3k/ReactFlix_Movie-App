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

## Feature Design

#### The Home Page
> Authenticated landing page with images, and SignIn.

![home](https://user-images.githubusercontent.com/24919671/231855873-545a14ea-dea1-48db-b86f-8f89cacbc4b7.png)

> Authenticated landing page with nav buttons.

![home2](https://user-images.githubusercontent.com/24919671/231855886-a5203fc5-54a8-43b1-9557-14a5f291544b.png)

#### The Movie Page
> Movie browsing Page with responsive grid, filter, search, appealing cards, favoriting, and hover details.

![movie](https://user-images.githubusercontent.com/24919671/231855894-fd49c093-3f3b-48ad-a48f-5a6071c02c72.png)

#### The Movie Detail Page
> Movie details Page: title, date, runtime, rating, genres, overview, cast, images, reviews, responsive design, API integration.

![movie_details](https://user-images.githubusercontent.com/24919671/231855903-97097d68-47f2-4166-be8f-001f2f565857.png)

#### The TV Show Page
> TV show browsing Page: responsive grid, filter, search, appealing cards, hover details.

![tvshow](https://user-images.githubusercontent.com/24919671/231855915-21efb2ff-9301-4e99-bde0-e1dae8c3ba52.png)

#### The People Page
> Searchable, filterable people page with pagination and clickable detail cards.

![people](https://user-images.githubusercontent.com/24919671/231855923-198efb68-89da-45b0-b17d-b04dda5eab60.png)

#### The Person Details Page
> Person info page: bio, known-for, credits, show-more option.

![person_details](https://user-images.githubusercontent.com/24919671/231855934-c7e20e5b-4b3a-4f76-b4a5-4f5312e3e3cc.png)

#### The Trending Page
> Trending page: responsive grid, movies/TV/people, filter by type/time, smooth navigation to details.

![trending](https://user-images.githubusercontent.com/24919671/231855940-0c73de59-6f6f-40c4-b771-a32b90cf3cbe.png)

#### The Favourites Page
> Favorite movies page: title, rating, poster, add/remove with heart button.

![favourites](https://user-images.githubusercontent.com/24919671/231855947-9ce44da0-9fda-449b-aacb-a81c309c7844.png)

#### The Account Page
> Account page: form inputs, avatar upload/preview, editing, Supabase data management.

![account](https://user-images.githubusercontent.com/24919671/231855959-a542a0b1-51d8-4877-b0b3-978c3d1445e4.png)

## Authentication.
> Only logged in and authenticated users can access the entire application

| Route             | Info                        |
|-------------------|-----------------------------|
| `/`               | Home Page                   |
| `/movies`         | Movies Listing              |
| `/movie/:movieId` | Individual Movie Details    |
| `/person/:personId` | Individual Person Details |
| `/trending`       | Trending Items              |
| `/tvshows`        | TV Shows Listing            |
| `/tvshow/:tvId`   | Individual TV Show Details  |
| `/people`         | People Listing              |
| `/account`        | User Account                |
| `/favorites`      | User's Favorite Movies      |

## Supabase

![supabase](https://user-images.githubusercontent.com/24919671/231857338-f2f833f8-e1f0-48f5-aa9e-0ac1c2c4fa7b.png)

## Persistence
> 2 Supabase (Postgres) tables used for persisting favourites & user profile (via auth)

![favour](https://user-images.githubusercontent.com/24919671/231857335-1cffe35c-d128-4df0-a395-0a258fe6630b.png)

![profile](https://user-images.githubusercontent.com/24919671/231857333-09581488-91d5-4362-aaa8-34f80b74bc18.png)

## Deployment
Live application - https://react-flix-movie-app.vercel.app/

![vercel](https://user-images.githubusercontent.com/24919671/231857332-50a17789-1181-40c3-a408-1027250385a8.png)
