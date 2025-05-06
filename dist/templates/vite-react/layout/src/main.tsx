import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<div>Home Page</div>} />
          <Route path="docs" element={<div>Docs Page</div>} />
          <Route path="library" element={<div>Library Page</div>} />
          <Route path="color" element={<div>Color Page</div>} />
          <Route path="awaken" element={<div>Awaken Page</div>} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
