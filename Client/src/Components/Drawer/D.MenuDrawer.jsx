import React from 'react';
import MainDrawer from './MainDrawer';
import Sidebar from '../../Layout/DoctorLayout/D.Sidebar';

function DMenuDrawer({ isOpen, toggleDrawer }) {
  return (
    <MainDrawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
      <Sidebar />
    </MainDrawer>
  );
}

export default DMenuDrawer;
