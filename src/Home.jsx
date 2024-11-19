// src/Home.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import About from './About';
import Services from './Services';
import WhatWeDo from './WhatWeDo';
import Contact from './Contact';
import Portfolio from './Portfolio';
import Enquiry from './Enquiry';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10 bg-black">
        <h1 className="text-2xl font-bold">Insphile Management Solutions</h1>
        <nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          <ul className={`md:flex space-x-12 ${isMenuOpen ? 'fixed inset-0 bg-black flex flex-col items-start justify-center space-y-4 p-4' : 'hidden'}`}>
            <li className="hover:text-yellow-500 font-medium text-xs"><Link to="/">Home</Link></li>
            <li className="hover:text-yellow-500 font-medium text-xs"><Link to="/about">About</Link></li>
            <li className="hover:text-yellow-500 font-medium text-xs"><Link to="/services">Services</Link></li>
            <li className="hover:text-yellow-500 font-medium text-xs"><Link to="/portfolio">Portfolio</Link></li>
            <li className="font-medium text-xs relative group">
              <Link to="/whatwedo" className="hover:text-yellow-500 flex items-center font-medium text-xs">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                What we do
              </Link>
              <ul className="absolute hidden group-hover:block bg-black text-white mt-2 space-y-2 p-2">
                <li className="hover:text-yellow-500 font-medium text-xs"><Link to="/whatwedo">Submenu 1</Link></li>
                <li className="hover:text-yellow-500 font-medium text-xs"><Link to="/whatwedo">Submenu 2</Link></li>
                <li className="hover:text-yellow-500 font-medium text-xs"><Link to="/whatwedo">Submenu 3</Link></li>
              </ul>
            </li>
            <li className="hover:text-yellow-500 font-medium text-xs"><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <div className="relative flex items-center justify-center min-h-screen bg-black border-2 border-red-800">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/img/groupHifi.jpg')" }}></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute left-0 ml-4 mb-96 flex flex-col items-start justify-center h-50 w-85 p-4">
          <p className="text-[8px] text-black">INSPHILE</p>
          <p className="text-[8px] text-black">MANAGEMENT</p>
          <p className="text-[8px] text-black">SOLUTIONS</p>
        </div>
        <div className="absolute left-0 ml-4 flex flex-col items-start justify-center h-50 w-85 p-4 bg-white bg-opacity-35 border-2 border-gray-300 rounded-2xl" id="bridging">
          <h1 className="text-4xl text-green-500">Bridging Top</h1>
          <h1 className="text-4xl text-green-500"> Talent  <span className="text-4xl text-black"> With</span></h1>
          <h1 className="text-4xl text-black">Top Companies</h1>
          <p className="text-sm text-black mt-4">
            With our quick and easy recruitment services you are
          </p>
          <p className="text-sm text-black">
            just one call away from building your dream team!
          </p>
        </div>
        <div className="absolute left-0 ml-28 mt-72 p-4 bg-transparent" id="callButton">
          <button className="px-4 py-2 bg-rose-100 text-black rounded-2xl">Book a Call</button>
        </div>
      </div>
      <About />
      <Services />
      <WhatWeDo />
      <Contact />
      <Portfolio />
      <Enquiry />
    </>
  );
}