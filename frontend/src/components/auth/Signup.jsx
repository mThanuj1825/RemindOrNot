import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/api/auth/signup", user);

      navigate("/login");
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
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
          Create a New Account
        </h1>
      </header>

      <main className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSignUp}
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
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={user.email}
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
            Sign Up
          </button>
        </form>
      </main>

      <footer className="text-center mt-8">
        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-700 hover:text-blue-800"
          >
            Login
          </Link>
        </p>
      </footer>
    </div>
  );
}

export default Signup;
