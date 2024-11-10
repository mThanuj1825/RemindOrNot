import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

function UpdateReminder() {
  const { reminderId } = useParams();
  const navigate = useNavigate();
  const [reminder, setReminder] = useState({
    title: "",
    description: "",
    dates: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminder = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/reminders/${reminderId}`,
        );

        const reminderData = response.data;

        const formattedDates = reminderData.dates.map((entry) => {
          const { date, time } = formatTime(entry);
          return { date, time };
        });

        setReminder({
          ...reminderData,
          dates: formattedDates,
        });
      } catch (err) {
        console.log(err);
        setError("Failed to fetch reminder data");
      } finally {
        setLoading(false);
      }
    };

    fetchReminder();
  }, [reminderId]);

  const formatTime = (timeString) => {
    const date = new Date(timeString);

    return {
      date: date.toISOString().slice(0, 10),
      time: date.toISOString().slice(11, 16),
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (index, newDate) => {
    const updatedDates = [...reminder.dates];
    updatedDates[index] = {
      ...updatedDates[index],
      date: newDate,
    };
    setReminder({ ...reminder, dates: updatedDates });
  };

  const handleTimeChange = (index, newTime) => {
    const updatedDates = [...reminder.dates];
    updatedDates[index] = {
      ...updatedDates[index],
      time: newTime,
    };
    setReminder({ ...reminder, dates: updatedDates });
  };

  const addDateField = () => {
    setReminder((prevReminder) => ({
      ...prevReminder,
      dates: [...prevReminder.dates, { date: "", time: "" }],
    }));
  };

  const removeDateField = (index) => {
    const updatedDates = reminder.dates.filter((_, i) => i !== index);
    setReminder({ ...reminder, dates: updatedDates });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedReminder = {
        title: reminder.title,
        description: reminder.description,
        dates: reminder.dates.map((entry) => {
          const dateTime = `${entry.date}T${entry.time}`;
          return dateTime;
        }),
      };

      await axiosInstance.patch(
        `/api/reminders/${reminderId}`,
        updatedReminder,
      );

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Failed to update reminder");
    }
  };

  if (loading) return <p>Loading reminder...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Update Reminder</h1>
      </header>

      <main className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {error && <p className="text-center text-red-600">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={reminder.title}
              onChange={handleChange}
              placeholder="Reminder title"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={reminder.description}
              onChange={handleChange}
              placeholder="Optional description"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dates & Times
            </label>
            {reminder.dates.map((entry, index) => {
              const { date, time } = entry;
              return (
                <div
                  key={index}
                  className="flex space-x-2 mt-2"
                >
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => handleDateChange(index, e.target.value)}
                    required
                    className="p-2 w-1/2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                    required
                    className="p-2 w-1/2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeDateField(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              onClick={addDateField}
              className="mt-2 text-blue-700 hover:text-blue-800 underline"
            >
              + Add another date & time
            </button>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            Update Reminder
          </button>
        </form>
      </main>
    </div>
  );
}

export default UpdateReminder;
