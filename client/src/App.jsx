import Register from "./Component/Register"
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Newlogin from "./Component/Newlogin";
import Homepage from "./Component/Homepage";
import About from "./Component/About";
import API from "./Component/Api";
import ContactUs from "./Component/ContactUs";

function App() {

  return (
    <><BrowserRouter>
      <Homepage />
      <Routes>
        {/* <Route path="/home" element={<Homepage />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Newlogin />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/api" element={<API />} />
      </Routes>
    </BrowserRouter></>
  )
}

export default App
