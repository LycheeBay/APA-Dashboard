import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import NavBar from './components/navbar.js';
import Home from './pages/home.js';
import TLAC from './pages/tlac.js';
import Others from './pages/others.js';
import Building5 from './pages/building-5.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      { /*
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tlac">TLAC</Link>
            </li>
            <li>
              <Link to="/others">Others</Link>
            </li>
          </ul>
        </nav>
      </div>
      */ }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tlac" element={<TLAC />} />
        <Route path="/others" element={<Others />} />
        <Route path="/tlac/building-5/*" element={<Building5 />} />
      </Routes>
    </Router>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
