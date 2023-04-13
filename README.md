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
