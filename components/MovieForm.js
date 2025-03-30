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
      actors: actors.split(",").map(actor => actor.trim()),
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
    "mt-1 w-full text-gray-800 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500 placeholder-gray-500";

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        {editingMovie ? "Edit Movie" : "Add New Movie"}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder="Movie title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Actors (comma-separated)</label>
        <input
          type="text"
          value={actors}
          onChange={(e) => setActors(e.target.value)}
          className={inputClass}
          placeholder="e.g. Tom Hanks, Tim Allen"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Release Year</label>
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          className={inputClass}
          placeholder="e.g. 1999"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md shadow"
        >
          {editingMovie ? "Update Movie" : "Add Movie"}
        </button>

        {editingMovie && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
