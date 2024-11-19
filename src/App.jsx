import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Services from './Services';
import Portfolio from './Portfolio';
import WhatWeDo from './WhatWeDo';
import Contact from './Contact';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/whatwedo" element={<WhatWeDo />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

