// Importing React to use JSX and the Toaster component from 'react-hot-toast'
import React from 'react';
import { Toaster } from 'react-hot-toast';

// Defining a functional component named Toast
function Toast() {
  return (
    // Rendering the Toaster component with customized options
    <Toaster
      position="bottom-left" // Positioning the toasts at the bottom-left of the screen
      reverseOrder={false}   // Keeping the order of the toasts as they are added
      gutter={8}             // Setting the space between toasts to 8 pixels
      toastOptions={{
        duration: 2000,      // Setting the duration of each toast to 2000 milliseconds (2 seconds)
        style: {
          background: '#fff', // Setting the background color of the toast to white
          color: '#000',      // Setting the text color of the toast to black
        },
      }}
    />
  );
}

// Exporting the Toast component as the default export
export default Toast;

