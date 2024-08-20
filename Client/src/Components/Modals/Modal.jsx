// Import necessary modules and components from React and Headless UI
import { Dialog, Transition } from '@headlessui/react'; // Dialog and Transition components from Headless UI for modal functionality
import { Fragment } from 'react'; // Fragment from React to avoid unnecessary DOM elements
import { FaTimes } from 'react-icons/fa'; // Importing the "close" icon from react-icons

// Define the Modal component as a functional component
export default function Modal({ closeModal, isOpen, width, children, title }) {
  return (
    <>
      {/* Transition component to handle the appearance and disappearance of the modal */}
      <Transition appear show={isOpen} as={Fragment}>
        {/* Dialog component from Headless UI to manage the modal structure */}
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          {/* Transition for the backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" // Transition classes for entering the modal
            enterFrom="opacity-0" // Initial state of the modal (invisible)
            enterTo="opacity-100" // Final state of the modal (visible)
            leave="ease-in duration-200" // Transition classes for leaving the modal
            leaveFrom="opacity-100" // Initial state of the modal when leaving (visible)
            leaveTo="opacity-0" // Final state of the modal when leaving (invisible)
          >
            {/* Backdrop to cover the rest of the screen */}
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* Container for the modal content */}
          <div className="fixed inset-0 overflow-y-auto">
            {/* Flex container to center the modal */}
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              {/* Transition for the modal panel */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300" // Transition classes for entering the modal
                enterFrom="opacity-0 scale-95" // Initial state of the modal (small and invisible)
                enterTo="opacity-100 scale-100" // Final state of the modal (full size and visible)
                leave="ease-in duration-300" // Transition classes for leaving the modal
                leaveFrom="opacity-100 scale-100" // Initial state of the modal when leaving (full size and visible)
                leaveTo="opacity-0 scale-95" // Final state of the modal when leaving (small and invisible)
              >
                {/* Modal panel */}
                <Dialog.Panel
                  className={` w-full ${
                    width ? width : 'max-w-4xl'
                  } transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  {/* Header of the modal with title and close button */}
                  <div className="w-full flex-btn gap-2 mb-8">
                    <h1 className="text-md font-semibold">{title}</h1> {/* Modal title */}
                    <button
                      onClick={closeModal} // Trigger closeModal function when the button is clicked
                      className="w-14 h-12 bg-dry text-red-600 rounded-md flex-colo"
                    >
                      <FaTimes /> {/* Close icon */}
                    </button>
                  </div>
                  {/* Content of the modal */}
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
