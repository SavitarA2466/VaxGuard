import React from 'react';
// Importing MainDrawer and Sidebar components
import MainDrawer from './MainDrawer';
import Sidebar from '../../Layout/DoctorLayout/D.Sidebar';

// Functional component DMenuDrawer
function DMenuDrawer({ isOpen, toggleDrawer }) {
  return (
    // MainDrawer component with props passed in
    <MainDrawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
      {/* Sidebar component nested inside MainDrawer */}
      <Sidebar />
    </MainDrawer>
  );
}

// Exporting DMenuDrawer as default export
export default DMenuDrawer;

