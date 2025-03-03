import React, { useState } from "react";

const MovieSearchApp = () => {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovie = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a movie title");
      return;
    }

    setLoading(true);
    setError("");
    setMovie(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }`
      );
      const data = await response.json();

      if (data.Response === "False") {
        setError(data.Error || "Movie not found");
      } else {
        setMovie(data);
      }
    } catch (err) {
      setError("An error occurred while fetching the movie data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 ">
      <div className="max-w-4xl mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
          Movie Searcher App
        </h1>

        <form onSubmit={searchMovie} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a movie title..."
              className="flex-grow p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded shadow-md">
            <p>{error}</p>
          </div>
        )}

        {movie && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                {movie.Poster && movie.Poster !== "N/A" ? (
                  <img
                    src={movie.Poster}
                    alt={`${movie.Title} poster`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 p-4">
                    No movie available
                  </div>
                )}
              </div>
              <div className="p-6 md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                    {movie.Year}
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                    {movie.Rated}
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">
                    {movie.Runtime}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500 mr-2">★</span>
                    <span className="font-bold">{movie.imdbRating}/10</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {movie.imdbVotes} votes
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-1">Plot</h3>
                  <p className="text-gray-700">{movie.Plot}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Director</h3>
                    <p className="text-gray-700">{movie.Director}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Genre</h3>
                    <p className="text-gray-700">{movie.Genre}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Released</h3>
                    <p className="text-gray-700">{movie.Released}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Language</h3>
                    <p className="text-gray-700">{movie.Language}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearchApp;
