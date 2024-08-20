import React from 'react';
// Importing the Drawer component from the 'react-modern-drawer' library
import Drawer from 'react-modern-drawer';

// Functional component MainDrawer
function MainDrawer({ isOpen, toggleDrawer, children }) {
  return (
    // Drawer component with props passed in
    <Drawer
      open={isOpen}                 // Controls whether the drawer is open or closed
      onClose={toggleDrawer}        // Function to call when the drawer should close
      direction="left"              // Specifies the direction the drawer slides in from
      className="bg-white overflow-y-scroll" // Additional classes for styling
    >
      {/* Render any child components passed in */}
      {children}
    </Drawer>
  );
}

// Exporting MainDrawer as default export
export default MainDrawer;
