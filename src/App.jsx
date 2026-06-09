import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OurIndustries from './pages/OurIndustries';
import OurMission from './pages/OurMission';
import RequestCrews from './pages/RequestCrews';
import Apply from './pages/Apply';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-industries" element={<OurIndustries />} />
        <Route path="/our-mission" element={<OurMission />} />
        <Route path="/request-crews" element={<RequestCrews />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </BrowserRouter>
  );
}
