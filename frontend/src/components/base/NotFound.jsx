import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Page Not Found</h1>
        <p className="text-gray-700 mb-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="text-blue-600 hover:underline"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
