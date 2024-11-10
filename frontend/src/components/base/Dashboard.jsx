import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { formatDate } from "@/utils/utils";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [reminders, setReminders] = useState([]);
  const [previousReminders, setPreviousReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axiosInstance.get("/api/reminders");

        const sortedReminders = response.data
          .filter((r) => !r.isCompleted)
          .sort((a, b) => new Date(a.dates[0]) - new Date(b.dates[0]));

        const sortedPreviousReminders = response.data
          .filter((r) => r.isCompleted)
          .sort((a, b) => new Date(a.dates[0]) - new Date(b.dates[0]));

        setReminders(sortedReminders);
        setPreviousReminders(sortedPreviousReminders);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch reminders");
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  const handleUpdate = (reminderId) => {
    navigate(`/updateReminder/${reminderId}`);
  };

  const handleDelete = async (reminderId) => {
    try {
      await axiosInstance.delete(`/api/reminders/${reminderId}`);

      setReminders((prevReminders) =>
        prevReminders.filter((reminder) => reminder._id !== reminderId),
      );
    } catch (err) {
      console.log(err);
      setError("Failed to delete reminder");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Your Dashboard</h1>
        <p className="text-gray-700 mt-2">Manage your reminders here</p>
      </header>

      <main className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-lg flex flex-col sm:flex-row sm:space-x-6">
        {loading ? (
          <p className="text-center text-gray-600">Loading your reminders...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            <div className="w-full sm:w-1/2">
              <h2 className="text-xl font-semibold text-blue-700 text-center sm:text-2xl md:text-3xl sm:font-bold sm:mb-5 md:mb-10">
                Reminders
              </h2>
              {reminders.length > 0 ? (
                <div className="max-h-96 overflow-y-auto mt-4 scrollbar-custom">
                  <ul className="space-y-4">
                    {reminders.map((reminder) => (
                      <li
                        key={reminder._id}
                        className="border-b pb-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-blue-700">
                              {reminder.title}
                            </h3>
                            <p className="text-gray-600">
                              {reminder.description}
                            </p>
                            <div className="text-sm text-gray-500 mt-2">
                              <p>Dates:</p>
                              <ul className="pl-5 list-disc">
                                {reminder.dates.map((date, index) => (
                                  <li key={index}>{formatDate(date)}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                            <button
                              onClick={() => handleUpdate(reminder._id)}
                              className="ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDelete(reminder._id)}
                              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-center text-gray-600">
                  You have no reminders yet!
                </p>
              )}
            </div>

            <div className="w-full sm:w-1/2 mt-8 sm:mt-0 ">
              <h2 className="text-xl font-semibold text-blue-700 text-center sm:text-2xl md:text-3xl sm:font-bold sm:mb-5 md:mb-10">
                Previous Reminders
              </h2>
              {previousReminders.length > 0 ? (
                <div className="max-h-96 overflow-y-auto mt-4 scrollbar-custom">
                  <ul className="space-y-4">
                    {previousReminders.map((reminder) => (
                      <li
                        key={reminder._id}
                        className="border-b pb-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-blue-700">
                              {reminder.title}
                            </h3>
                            <p className="text-gray-600">
                              {reminder.description}
                            </p>
                            <div className="text-sm text-gray-500 mt-2">
                              <p>Dates:</p>
                              <ul className="pl-5 list-disc">
                                {reminder.dates.map((date, index) => (
                                  <li key={index}>{formatDate(date)}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                            <button
                              onClick={() => handleUpdate(reminder._id)}
                              className="ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-center text-gray-600">
                  No previous reminders!
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
