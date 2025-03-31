import { useState, useEffect } from "react";

export default function MovieForm({ onSubmit, editingMovie, cancelEdit }) {
  const [title, setTitle] = useState("");
  const [actors, setActors] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  useEffect(() => {
    if (editingMovie) {
      setTitle(editingMovie.title);
      setActors(editingMovie.actors.join(", "));
      setReleaseYear(editingMovie.releaseYear);
    } else {
      setTitle("");
      setActors("");
      setReleaseYear("");
    }
  }, [editingMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !actors.trim() || !releaseYear || releaseYear < 1900) {
      alert("Please fill all fields correctly. Release year must be after 1900.");
      return;
    }

    const movieData = {
      title: title.trim(),
      actors: actors.split(",").map((actor) => actor.trim()),
      releaseYear: parseInt(releaseYear),
    };

    if (editingMovie) {
      movieData.id = editingMovie.id;
    }

    onSubmit(movieData);
    setTitle("");
    setActors("");
    setReleaseYear("");
  };

  const inputClass =
    "mt-1 w-full text-gray-800 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder-gray-400 shadow-sm transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-8 mb-8 border border-gray-200 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 tracking-tight">
        {editingMovie ? "Edit Movie" : "Add New Movie"}
      </h2>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder="Movie title"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-600 mb-1">Actors (comma-separated)</label>
        <input
          type="text"
          value={actors}
          onChange={(e) => setActors(e.target.value)}
          className={inputClass}
          placeholder="e.g. Tom Hanks, Tim Allen"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">Release Year</label>
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          className={inputClass}
          placeholder="e.g. 1999"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-start">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 transition text-white px-6 py-2 rounded-lg shadow-md"
        >
          {editingMovie ? "Update Movie" : "Add Movie"}
        </button>

        {editingMovie && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-400 hover:bg-gray-500 transition text-white px-6 py-2 rounded-lg shadow-md"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
