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

  const updateMovie = (id: number, name: string) => {
    setMovies(movies.map(movie => (movie.id === id ? { ...movie, name } : movie)));
  };

  const deleteMovie = (id: number) => {
    setMovies(movies.filter(movie => movie.id !== id));
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
          <MovieItem key={movie.id} movie={movie} updateMovie={updateMovie} deleteMovie={deleteMovie} />
        ))}
      </div>
    </div>
  );
};

interface MovieItemProps {
  movie: Movie;
  updateMovie: (id: number, name: string) => void;
  deleteMovie: (id: number) => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, updateMovie, deleteMovie }) => {
  const [name, setName] = useState(movie.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    updateMovie(movie.id, e.target.value);
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleChange} />
      <button onClick={() => deleteMovie(movie.id)}>X</button>
    </div>
  );
};

export default MovieTracker;