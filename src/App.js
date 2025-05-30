import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Style.css';
import ScrollToTop from "./components/ScrollToTop";
import Navbar from './components/Navbar';
import Home from './pages/Home';
function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;