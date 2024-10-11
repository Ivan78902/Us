import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, Heart, Image, Calendar } from 'lucide-react';

const PageSelector: React.FC = () => {
  const location = useLocation();

  const pages = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/timeline', icon: Clock, label: 'Timeline' },
    { path: '/photos', icon: Image, label: 'Photos' },
    { path: '/letter', icon: Heart, label: 'Letter' },
    { path: '/countdown', icon: Calendar, label: 'Countdown' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-75 py-2">
      <div className="container mx-auto flex justify-around items-center">
        {pages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            className={`flex flex-col items-center p-2 ${
              location.pathname === page.path ? 'text-rose-gold' : 'text-burgundy'
            }`}
          >
            <page.icon size={24} />
            <span className="text-xs mt-1">{page.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PageSelector;