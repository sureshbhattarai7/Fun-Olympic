import Register from "./Component/Register"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Newlogin from "./Component/Newlogin";
import Home from "./Component/Homepage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navbar />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Newlogin />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App