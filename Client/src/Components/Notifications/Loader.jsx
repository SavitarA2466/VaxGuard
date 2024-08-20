// Importing the ScaleLoader component from the 'react-spinners' library
import { ScaleLoader } from 'react-spinners';

// Defining a functional component named Loader
function Loader() {
  return (
    // Creating a container div with utility classes for styling
    <div className="w-full py-4 px-2 flex-colo">
      {/* Rendering the ScaleLoader component with a specified color */}
      <ScaleLoader color="#66B5A3" />
    </div>
  );
}

// Exporting the Loader component as the default export
export default Loader;

