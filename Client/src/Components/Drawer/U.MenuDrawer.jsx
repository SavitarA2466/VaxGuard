import React from 'react';
// Importing MainDrawer and Sidebar components
import MainDrawer from './MainDrawer';
import Sidebar from '../../Layout/UserLayout/U.Sidebar';

// Functional component UMenuDrawer
function UMenuDrawer({ isOpen, toggleDrawer }) {
  return (
    // MainDrawer component with props passed in
    <MainDrawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
      {/* Sidebar component nested inside MainDrawer */}
      <Sidebar />
    </MainDrawer>
  );
}

// Exporting UMenuDrawer as default export
export default UMenuDrawer;
