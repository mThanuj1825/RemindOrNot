import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

function CreateReminder() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dates, setDates] = useState([{ date: "", time: "" }]);
  const [message, setMessage] = useState("");

  const handleDateChange = (index, value) => {
    const newDates = [...dates];
    newDates[index].date = value;
    setDates(newDates);
  };

  const handleTimeChange = (index, value) => {
    const newDates = [...dates];
    newDates[index].time = value;
    setDates(newDates);
  };

  const addDateField = () => {
    setDates((prevDates) => [...prevDates, { date: "", time: "" }]);
  };

  const formatDateTime = (date, time) => {
    const dateTime = `${date}T${time}`;
    return new Date(dateTime).toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDates = dates.map((entry) =>
        formatDateTime(entry.date, entry.time),
      );

      const response = await axiosInstance.post("/api/reminders", {
        title,
        description,
        dates: formattedDates,
      });

      setMessage({ type: "success", text: response.data.message });
      setTitle("");
      setDescription("");
      setDates([{ date: "", time: "" }]);
    } catch (err) {
      setMessage({
        type: "error",
        text:
          "Failed to create reminder: " +
          (err.response?.data.message || err.message),
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">
          Create a New Reminder
        </h1>
      </header>

      <main className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {message && (
          <p
            className={`mb-4 ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dates & Times
            </label>
            {dates.map((entry, index) => (
              <div
                key={index}
                className="flex space-x-2 mt-2"
              >
                <input
                  type="date"
                  value={entry.date}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                  required
                  className="p-2 w-1/2 border border-gray-300 rounded-md"
                />
                <input
                  type="time"
                  value={entry.time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                  required
                  className="p-2 w-1/2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
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
            Create Reminder
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateReminder;
