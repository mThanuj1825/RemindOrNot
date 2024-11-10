import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/base/Landing";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/base/Dashboard";
import Layout from "./components/base/Layout";
import PrivateRoute from "./components/auth/PrivateRoute";
import CreateReminder from "./components/reminder/CreateReminder";
import UpdateReminder from "./components/reminder/UpdateReminder";
import NotFound from "./components/base/NotFound";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/createReminder"
            element={<PrivateRoute element={<CreateReminder />} />}
          />
          <Route
            path="/updateReminder/:reminderId"
            element={<PrivateRoute element={<UpdateReminder />} />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
