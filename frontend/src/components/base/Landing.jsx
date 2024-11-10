import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-amber-600 p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Welcome to RemindMeNot!
        </h1>
        <p className="text-lg sm:text-xl">Manage your reminders easily</p>
      </header>
      <nav className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 items-center">
        <div>
          <Link
            to="/login"
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-lg transition duration-300 text-center"
          >
            Login
          </Link>
        </div>
        <div>
          <Link
            to="/signup"
            className="bg-teal-700 hover:bg-teal-800 text-white py-2 px-6 rounded-lg transition duration-300 text-center"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Landing;
