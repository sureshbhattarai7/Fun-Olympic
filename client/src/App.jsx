import Register from "./Component/Register"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Newlogin from "./Component/Newlogin";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Newlogin />} />
        <Route path="/signup" element={<Register/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App