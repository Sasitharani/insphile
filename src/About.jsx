// src/About.jsx
export default function About() {
  return (
    <div id="about" className="relative flex flex-col items-center justify-center min-h-screen border-2 border-blue-800 p-4">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/img/hands.jpg')" }}></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute bg-black left-0 mb-96 flex flex-col items-start justify-center h-50 w-85 p-4">
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
  );
}