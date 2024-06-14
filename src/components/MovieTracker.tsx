import React, { useState } from 'react';

interface Movie {
  id: number;
  name: string;
}

const MovieTracker: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState<string>('');

  const addMovie = () => {
    if (newMovie.trim()) {
      setMovies([...movies, { id: Math.random(), name: newMovie }]);
      setNewMovie('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newMovie}
        onChange={(e) => setNewMovie(e.target.value)}
      />
      <button onClick={addMovie}>Add</button>
      <div>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  return (
    <div>
      <input type="text" value={movie.name} readOnly />
      <button>X</button>
    </div>
  );
};

export default MovieTracker;