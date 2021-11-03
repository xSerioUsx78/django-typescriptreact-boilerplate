import React from 'react';
import Navbar from './Navbar';


const Layout: React.FC = ({ children }) => {
  return (
    <div className="relative bg-white overflow-x-hidden h-screen">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        {children}
      </div>
    </div>
  )
};

export default Layout;