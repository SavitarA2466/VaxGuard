// Importing necessary modules and components from external libraries
import { BsClipboardData } from 'react-icons/bs'; // Importing an icon from 'react-icons'
import { Link } from 'react-router-dom'; // Importing Link component from 'react-router-dom' for navigation
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Importing CopyToClipboard component for clipboard functionality

// InlineError Component: Displays an inline error message with red text
export const InlineError = ({ text }) => {
  return (
    <div className="text-red-600 w-full mt-2 text-xs font-medium">
      {/* Displaying the error text */}
      <p>{text}</p>
    </div>
  );
};

// Error Component: Displays a full-page error message with an image, error text, and a "Go Back" button
export const Error = ({ text }) => {
  return (
    <div className="my-12 flex-colo w-full gap-2">
      {/* Displaying an error image */}
      <img
        src="/images/notfound.svg"
        alt="404"
        className="w-full h-56 object-contain"
      />
      {/* Displaying the error title */}
      <h1 className="text-2xl text-red-600 my-4 font-bold text-center">
        Error
      </h1>
      {/* Displaying the error text */}
      <p className="text-center text-sm">{text}</p>
      {/* Link to navigate back to the home page */}
      <Link to="/">
        <button className=" bg-subMain rounded mt-4 text-white px-8 py-2">
          Go Back
        </button>
      </Link>
    </div>
  );
};

// Empty Component: Displays a message indicating an empty state with an icon
export const Empty = ({ text }) => {
  return (
    <div className="my-12 flex-colo w-full gap-2">
      {/* Displaying an icon in a circular background */}
      <div className="flex-colo w-24 rounded-full h-24 text-white bg-subMain">
        <BsClipboardData className="text-2xl" />
      </div>
      {/* Displaying the empty state text */}
      <h1 className="text-sm font-bold text-center">{text}</h1>
    </div>
  );
};

// Copy Component: Wraps its children with clipboard functionality to copy provided text
export const Copy = ({ text, children }) => {
  return <CopyToClipboard text={text}>{children}</CopyToClipboard>;
};
