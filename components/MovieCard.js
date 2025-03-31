export default function MovieCard({ movie, onEdit, onDelete }) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6 hover:shadow-md transition duration-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{movie.title}</h2>
        
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium text-gray-700">Actors:</span> {movie.actors.join(", ")}
        </p>
        
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Release Year:</span> {movie.releaseYear}
        </p>
  
        <div className="mt-5 flex flex-wrap gap-4">
          <button
            onClick={() => onEdit(movie)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-sm transition"
          >
            Edit
          </button>
  
          <button
            onClick={() => onDelete(movie.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-sm transition"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  