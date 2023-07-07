import React from "react";
import Register from "./Component/Register"
import { Routes, Route } from 'react-router-dom';
import Newlogin from "./Component/Newlogin";
import About from "./Component/About";
import ContactUs from "./Component/ContactUs";
import ForgotPassword from "./Component/ResetPassword";
import Highlight from "./Component/Highlight";
import Live from "./Component/Live";
import AdminDashboard from "./Component/Admin/AdminDashboard";
import Homepage from "./Component/Homepage";
import { Broadcast } from "./Component/Admin/Broadcast";
import UsersMessages from "./Component/Admin/UsersMessages";
import Root from "./Component/Root";
import Changepass from "./Component/Changepass";
import MainLive from "./Component/MainLive";
import Profile from "./Component/Profile";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>

          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/highlight" element={<Highlight />} />
          <Route path="/live" element={<Live />} />
          <Route path="/live/:id" element={<MainLive />} />
          <Route path="/:id" element={<Profile />} />

        </Route>

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Newlogin />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/changepass:/id" element={<Changepass />} />

        <Route path="/admin" element={<AdminDashboard />}>
        </Route>
        <Route path="/admin/broadcast" element={<Broadcast />} />
        <Route path="/admin/usersmessages" element={<UsersMessages />} />

      </Routes>

    </>

  )
}

export default App
