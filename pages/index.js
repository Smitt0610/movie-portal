import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieForm from "../components/MovieForm";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  const fetchMovies = async () => {
    const res = await fetch("/api/movies");
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddOrUpdate = async (movie) => {
    if (movie.id) {
      await fetch("/api/movies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });
    } else {
      await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });
    }

    setEditingMovie(null);
    fetchMovies();
  };

  const handleDelete = async (id) => {
    await fetch("/api/movies", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deleteId: id }),
    });

    fetchMovies();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl">
          <MovieForm
            onSubmit={handleAddOrUpdate}
            editingMovie={editingMovie}
            cancelEdit={() => setEditingMovie(null)}
          />

          {movies.length === 0 ? (
            <p className="text-center text-gray-500">No movies yet.</p>
          ) : (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onEdit={setEditingMovie}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
