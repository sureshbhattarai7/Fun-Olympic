import Register from "./Component/Register"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Newlogin from "./Component/Newlogin";
import Navbar from "./Component/Navbar";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navbar />} /> */}
        <Route path="/" element={<Newlogin />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App