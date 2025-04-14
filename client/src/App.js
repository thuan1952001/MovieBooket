import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import "./stylesheets/alignments.css"
import "./stylesheets/customs.css"
import "./stylesheets/form-element.css"
import "./stylesheets/size.css"
import "./stylesheets/theme.css"
import "./index.css"
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
