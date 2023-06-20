import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TrackSectionComponent from './components/TrackSectionComponent';


export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

function AppRouter() {
  const location = useLocation();

  return (
    <div>

      <Routes>
      <Route path="/"  element={<TrackSectionComponent />}/>


      </Routes>

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
