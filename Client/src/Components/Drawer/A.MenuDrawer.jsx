import React from 'react';
// Importing MainDrawer and Sidebar components
import MainDrawer from './MainDrawer';
import Sidebar from '../../Layout/AdminLayout/A.Sidebar';

// Functional component AMenuDrawer
function AMenuDrawer({ isOpen, toggleDrawer }) {
  return (
    // MainDrawer component with props passed in
    <MainDrawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
      {/* Sidebar component nested inside MainDrawer */}
      <Sidebar />
    </MainDrawer>
  );
}

// Exporting AMenuDrawer as default export
export default AMenuDrawer;
