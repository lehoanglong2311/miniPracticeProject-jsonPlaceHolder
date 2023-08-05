import './App.css';
import { BrowserRouter, Routes, Route, Link, redirect, NavLink, Redirect, Outlet } from "react-router-dom";
import Header from './components/Header';
import Users from './components/Users';
import Photos from './components/Photos';
import UserDetail from './components/UserDetail';
function App() {
  return (
    <div className="App">
      
      <Header />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/photos" element={<Photos />} />
      </Routes>
    </div>
  );
}

export default App;
