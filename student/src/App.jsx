import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// User Components
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import UserLayout from "./Components/UserDashboard/UserLayout"; // ✅ Fix Import
import Home from "./Components/UserDashboard/Home";
import UserEvents from "./Components/UserDashboard/UserEvents";
import UserProfile from "./Components/UserDashboard/UserProfile";
import UserNotifications from "./Components/UserDashboard/UserNotifications";

// Admin Components
import AdminRegister from "./Components/Admin/AdminRegister";
import AdminLogin from "./Components/Admin/AdminLogin";
import Events from "./Components/Admin/Events";
import Reports from "./Components/Admin/Reports";
import Sidebar from "./Components/Admin/Sidebar";
import AddEvent from "./Components/Admin/AddEvent";
import Users from "./Components/Admin/Users";
import AdminNotifications from "./Components/Admin/AdminNotifications";
import AdminNotificationsList from "./Components/Admin/AdminNotificationsList";
import RegisteredEvents from "./Components/UserDashboard/RegisteredEvents";

function App() {
  return (
      <Routes>
        {/* User Authentication Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Dashboard Layout (Sidebar + Content) */}
        <Route path="/" element={<UserLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="events" element={<UserEvents />} />
          <Route path="registeredevents" element={<RegisteredEvents/>}/>
          <Route path="profile" element={<UserProfile />} />
          <Route path="notifications" element={<UserNotifications />} />
        </Route>

        {/* Admin Authentication Routes */}
        <Route path="/admin" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin/*" element={<Sidebar />}>
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
