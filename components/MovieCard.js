export default function MovieCard({ movie, onEdit, onDelete }) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow p-5 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{movie.title}</h2>
        <p className="text-sm text-gray-600"><strong>Actors:</strong> {movie.actors.join(", ")}</p>
        <p className="text-sm text-gray-600"><strong>Release Year:</strong> {movie.releaseYear}</p>
  
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onEdit(movie)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  