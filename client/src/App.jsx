import React from "react";
import Register from "./Component/Register"
import { Routes, Route } from 'react-router-dom';
import Newlogin from "./Component/Newlogin";
import Homepage from "./Component/Homepage";
import About from "./Component/About";
import API from "./Component/Api";
import ContactUs from "./Component/ContactUs";
import ForgotPassword from "./Component/ForgotPassword";

function App() {
  return (
    <>
      <Homepage />
      <Routes>
        <Route element={null}>

          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/api" element={<API />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

        </Route>

        <Route path="/login" element={<Newlogin />} />
        <Route path="/signup" element={<Register />} />

      </Routes>

    </>

  )
}

export default App
