"use client"
import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <Head>
        <title>Insphile Management Solutions</title>
    </Head>
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="w-full">
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
              <li className="hover:text-yellow-500 font-medium text-xs"><a href="#home">Home</a></li>
              <li className="hover:text-yellow-500 font-medium text-xs"><a href="#about">About</a></li>
              <li className="hover:text-yellow-500 font-medium text-xs"><a href="#services">Services</a></li>
              <li className="hover:text-yellow-500 font-medium text-xs"><a href="#portfolio">Portfolio</a></li>
              <li className="font-medium text-xs relative group">
                <a href="#whatwedo" className="hover:text-yellow-500 flex items-center font-medium text-xs">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  What we do
                </a>
                <ul className="absolute hidden group-hover:block bg-black text-white mt-2 space-y-2 p-2">
                  <li className="hover:text-yellow-500 font-medium text-xs"><a href="#whatwedo">Submenu 1</a></li>
                  <li className="hover:text-yellow-500 font-medium text-xs"><a href="#whatwedo">Submenu 2</a></li>
                  <li className="hover:text-yellow-500 font-medium text-xs"><a href="#whatwedo">Submenu 3</a></li>
                </ul>
              </li>
              <li className="hover:text-yellow-500 font-medium text-xs"><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </header>
        <div id="home" className="relative flex items-center justify-center min-h-screen bg-black border-2 border-red-800">
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
        <div id="about" className="relative flex flex-col items-center justify-center min-h-screen  border-2 border-blue-800 p-4">
          <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/img/hands.jpg')" }}></div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-black left-0  mb-96 flex flex-col items-start justify-center h-50 w-85 p-4">
            <p className="text-[8px] text-white">INSPHILE</p>
            <p className="text-[8px] text-white">MANAGEMENT</p>
            <p className="text-[8px] text-white">SOLUTIONS</p>
          </div>
          <div className="relative mt-36 h-96 w-[400px] flex flex-col items-center justify-evenly p-4 bg-black bg-opacity-50 border-2 border-gray-300 rounded-2xl">
            <h2 className="text-4xl font-bold mb-4 text-white">About Us</h2>
            <p className="text-lg text-white text-center">
              Welcome to INSPHILE, your premier partner in bridging talent and opportunity.
            </p>
            <p className="text-lg text-white text-center mt-4">
              Founded in early 2017 by Ms. Subashini T, we are a top recruitment service provider, committed to enhancing companies in various sectors with superior human resource solutions. At INSPHILE, we do more than just fill jobs—we create opportunities for success and growth for both our clients and the candidates we help.
            </p>
          </div>
        </div>
        <div id="services" className="flex items-center justify-center min-h-screen border-2 border-green-800">
          <h2 className="text-4xl font-bold">Services</h2>
        </div>
        <div id="portfolio" className="flex items-center justify-center min-h-screen border-2 border-yellow-800">
          <h2 className="text-4xl font-bold">Portfolio</h2>
        </div>
        <div id="whatwedo" className="flex items-center justify-center min-h-screen border-2 border-purple-800">
          <h2 className="text-4xl font-bold">What we do</h2>
        </div>
        <div id="contact" className="flex items-center justify-center min-h-screen border-2 border-pink-800">
          <h2 className="text-4xl font-bold">Contact</h2>
        </div>
      </div>
    </div>
    </>
  );
}
