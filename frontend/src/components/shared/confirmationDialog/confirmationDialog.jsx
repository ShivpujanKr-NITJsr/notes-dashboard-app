export const ConfirmationDialog = ({ handleClick, handleCloseModal, title }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#2a2a2a] p-6 rounded-lg text-white shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">
          {title}
        </h3>
        <div className="flex justify-between">
          <button
            onClick={handleClick}
            className="bg-red-600 text-white py-2 px-4 cursor-pointer rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={handleCloseModal}
            className="bg-gray-600 text-white py-2 px-4 cursor-pointer rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
