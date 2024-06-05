import React from 'react';
import MainDrawer from './MainDrawer';
import Sidebar from '../../Layout/UserLayout/U.Sidebar';

function UMenuDrawer({ isOpen, toggleDrawer }) {
  return (
    <MainDrawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
      <Sidebar />
    </MainDrawer>
  );
}

export default UMenuDrawer;
