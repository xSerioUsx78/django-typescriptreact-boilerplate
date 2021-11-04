import React from 'react';
import Navbar from './Navbar';


const Layout: React.FC = ({ children }) => {
  return (
    <div className="bg-white">
      <div className="h-screen">
        <div className="max-w-7xl mx-auto">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  )
};

export default Layout;