import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Auth from './pages/auth/Auth';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


// User Pages
import UserTravelGuides from './pages/user/TravelGuides';
import UserEvents from './pages/user/Events';
import UserShop from './pages/user/Shop'; 
import UserBlogs from './pages/user/Blogs'
import Cart from './pages/Cart'


// Admin Pages
import AdminTravelGuides from './pages/admin/TravelGuides';
import AdminEvents from './pages/admin/Events';
import AdminShop from './pages/admin/Shop'; 
import AdminBlogs from './pages/admin/Blogs'
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>

    <AuthProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
         
          <Route path="/travel-guides" element={<UserTravelGuides />} />
          <Route path="/events" element={<UserEvents />} />
          <Route path="/shop" element={<UserShop />} />
          <Route path="/blogs" element={<UserBlogs />}/>
          <Route path="/cart" element= {<Cart />} />

          <Route path="/admin/travel-guides" element={<AdminTravelGuides />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/shop" element={<AdminShop />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />

        </Routes>
    </AuthProvider>
    </Router>

  );
}

export default App;
