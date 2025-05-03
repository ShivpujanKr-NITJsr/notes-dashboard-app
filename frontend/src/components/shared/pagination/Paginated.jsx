import React from "react";

export const Paginated = ({ p, arr, i, setPage, page }) => {
  return (
    <div key={p}>
      {i > 0 && p - arr[i - 1] > 1 && (
        <span className="px-2 text-[#666]">...</span>
      )}
      <button
        className={`px-3 py-1 rounded-full cursor-pointer ${
          page === p
            ? "bg-blue-600 text-white"
            : "bg-[#2a2a2a] text-[#ccc] hover:bg-[#444]"
        }`}
        onClick={() => setPage(p)}
      >
        {p}
      </button>
    </div>
  );
};
