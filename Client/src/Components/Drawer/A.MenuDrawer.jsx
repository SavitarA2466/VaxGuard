import React from 'react';
import MainDrawer from './MainDrawer';
import Sidebar from '../../Layout/AdminLayout/A.Sidebar';

function AMenuDrawer({ isOpen, toggleDrawer }) {
  return (
    <MainDrawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
      <Sidebar />
    </MainDrawer>
  );
}

export default AMenuDrawer;
