import { useNavigate, useLocation } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    navigate("/login");
  };

  const createReminder = () => {
    navigate("/createReminder");
  };

  const handleAppNameClick = () => {
    if (!["/", "/login", "/signup"].includes(location.pathname)) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-blue-700 text-white shadow-lg z-10">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold cursor-pointer"
          onClick={handleAppNameClick}
        >
          RemindMeNot
        </h1>
        {sessionStorage.getItem("jwt") && (
          <div className="flex space-x-4 sm:space-x-6">
            <button
              onClick={createReminder}
              className="bg-white text-xs sm:text-lg md:text-xl text-blue-700 font-semibold px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-100 transition"
            >
              Create Reminder
            </button>
            <button
              onClick={handleLogout}
              className="bg-white text-xs sm:text-lg md:text-xl text-blue-700 font-semibold px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </header>
      <main className="bg-gray-50 min-h-screen pt-16">{children}</main>
    </>
  );
}

export default Layout;
