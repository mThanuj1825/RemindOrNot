import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/auth/login", user);

      sessionStorage.setItem("jwt", response.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false when the request is done
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">
          Login to Your Account
        </h1>
      </header>

      <main className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        {loading && (
          <div className="mb-4 text-blue-700 text-center">Logging in...</div> // Show message when loading
        )}
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleLogin}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={user.username}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>
      </main>

      <footer className="text-center mt-8">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-700 hover:text-blue-800"
          >
            Sign Up
          </Link>
        </p>
      </footer>
    </div>
  );
}

export default Login;
