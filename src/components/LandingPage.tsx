import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://source.unsplash.com/random/1920x1080?couple,romantic')"}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-script text-white mb-4 shadow-text">
          Welcome to Our World, Shernice
        </h1>
        <p className="text-2xl md:text-3xl font-sans text-white mb-8 shadow-text">
          Made with love, by Ivan
        </p>
        <Link to="/timeline" className="bg-rose-gold text-white font-sans py-2 px-6 rounded-full hover:bg-burgundy transition duration-300 flex items-center mx-auto inline-flex">
          Explore Our Story
          <Heart className="ml-2" size={20} />
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;