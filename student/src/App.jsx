import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// User Components
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import Home from "./Components/UserDashboard/Home";
import UserEvents from "./Components/UserDashboard/UserEvents"
import UserProfile from "./Components/UserDashboard/UserProfile";
import UserNotifications from "./Components/UserDashboard/UserNotifications"

// Admin Components
import AdminRegister from "./Components/Admin/AdminRegister";
import AdminLogin from "./Components/Admin/AdminLogin";
import Events from "./Components/Admin/Events";
import Reports from "./Components/Admin/Reports";
import Sidebar from "./Components/Admin/Sidebar"; // Ensure you're importing Navbar, not Sidebar
import AddEvent from "./Components/Admin/AddEvent";
import Users from "./Components/Admin/Users";

function App() {
  return (
    <Routes>
        {/* User Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<UserEvents/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/notifications" element={<UserNotifications/>}/>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Wrap admin-related routes inside Navbar */}
        <Route path="/admin/*" element={<Sidebar />}>
          <Route path="events" element={<Events />} />
          <Route path="reports" element={<Reports />} />
          <Route path="addevent" element={<AddEvent/>}/>
          <Route path="users" element={<Users/>}/>
        </Route>
      </Routes>
  );
}

export default App;
