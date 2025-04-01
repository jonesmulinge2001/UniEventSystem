import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// User Components
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import UserLayout from "./Components/UserDashboard/UserLayout";
import Home from "./Components/UserDashboard/Home";
import RegisteredEvents from "./Components/UserDashboard/RegisteredEvents";
import UserProfile from "./Components/UserDashboard/UserProfile";
import UserNotifications from "./Components/UserDashboard/UserNotifications";

// Admin Components
import AdminLogin from "./Components/Admin/AdminLogin";
import Events from "./Components/Admin/Events";
import Reports from "./Components/Admin/Reports";
import Sidebar from "./Components/Admin/Sidebar";
import AddEvent from "./Components/Admin/AddEvent";
import Users from "./Components/Admin/Users";
import AdminNotifications from "./Components/Admin/AdminNotifications";
import AdminNotificationsList from "./Components/Admin/AdminNotificationsList";

// Function to check if a user is authenticated (mocking with localStorage)
const isAuthenticated = () => {
  return localStorage.getItem("user") !== null; // Assumes user data is stored in localStorage
};

function App() {
  return (
      <Routes>
        {/* Redirect to signup if user is not authenticated */}
        <Route path="/" element={isAuthenticated() ? <UserLayout /> : <Navigate to="/signup" />} />
        
        {/* User Authentication Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Dashboard Layout */}
        <Route path="/" element={<UserLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="registeredevents" element={<RegisteredEvents />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="notifications" element={<UserNotifications />} />
        </Route>

        {/* Admin Authentication */}
        <Route path="/admin" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<Sidebar />}>
          <Route index element={<Navigate to="events" />} />
          <Route path="events" element={<Events />} />
          <Route path="reports" element={<Reports />} />
          <Route path="addevent" element={<AddEvent />} />
          <Route path="users" element={<Users />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="notificationslist" element={<AdminNotificationsList />} />
        </Route>
      </Routes>
  );
}

export default App;
