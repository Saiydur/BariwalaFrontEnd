import logo from './logo.svg';
import './App.css';
import Users from './components/Users/Users';
import Login from './pages/Login/Login';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Registration from './pages/Registration/Registration';
import Dashboard from './pages/Dashboard/Dashboard';
import Edit from './pages/Profile/Edit/Edit';
import Password from './pages/Profile/Password/Password';
import Show from './pages/Profile/Show/Show';
import Delete from './pages/Profile/Delete/Delete';
import AddFlat from './pages/Flat/Add/AddFlat';
import ShowFlat from './pages/Flat/Show/ShowFlat';
import EditFlat from './pages/Flat/Edit/EditFlat';
import DeleteFlat from './pages/Flat/Delete/DeleteFlat';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/edit/:id" element={<Edit/>} />
            <Route path="/change-password" element={<Password/>} />
            <Route path='/admin' element={<Users />} />
            <Route path='/admin/user/show/:id' element={<Show />} />
            <Route path='/admin/user/delete/:id' element={<Delete />} />
            <Route path='/add-flat' element={<AddFlat />} />
            <Route path='/show-flat' element={<ShowFlat />} />
            <Route path='/edit-flat/:id' element={<EditFlat />} />
            <Route path="/delete-flat/:id" element={<DeleteFlat/>} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
    </div>
  );

  function NoMatch() {
    return (
      <div>
        <h2>Page not found</h2>
      </div>
    );
  }

  function Logout(){
    axios.post('http://127.0.0.1:8000/api/logout',{token: localStorage.getItem('token')})
    .then(response => {
      if(response.data.status===200){
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    })
    .catch(error => {
      console.log("logout error", error);
    });
  }

  function Home(){
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }

  function About(){
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }

  function Contact(){
    return (
      <div>
        <h2>Contact</h2>
      </div>
    );
  }
}

export default App;
