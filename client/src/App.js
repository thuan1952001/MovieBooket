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
import { useSelector } from 'react-redux';
import Proflie from './pages/proflie';
import Admin from './pages/admin';
import TheatresForMovie from './pages/theatresForMovie'
import BookShow from './pages/bookShow';


function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && (
        <div className="loader-parent">
        <div className="loader"></div>
      </div>)}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/book-show/:id" element={<ProtectedRoute><BookShow /></ProtectedRoute>} />
          <Route path="/movie/:id" element={<ProtectedRoute><TheatresForMovie /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Proflie /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
