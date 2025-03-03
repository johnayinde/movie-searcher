# Movie Search App

A modern React application built with Vite that allows users to search for movies using the OMDb API.

## Features

- Search for movies by title
- Display movie details including title, poster, release date, and rating
- Responsive design using Tailwind CSS
- Loading states and error handling

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/johnayinde/movie-searcher.git
cd movie-searcher
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Get an API key

- Visit [OMDb API](https://www.omdbapi.com/apikey.aspx) to get a free API key

### 4. Create environment variables

The project already includes a `.env` file. Replace the placeholder with your actual API key:

```
VITE_OMDB_API_KEY=key
```

### 5. Start the development server

```bash
yarn dev
```

The application will open in your browser at [http://localhost:5173](http://localhost:5173).

## Technologies Used

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [OMDb API](https://www.omdbapi.com/) - Open Movie Database API
