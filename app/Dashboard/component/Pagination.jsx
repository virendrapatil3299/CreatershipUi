import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  pageSize,
  totalItems
}) {
  // Ensure pageSize and totalItems are valid numbers
  const validPageSize = pageSize || 12;
  const validTotalItems = totalItems || 0;

  const startIndex = validTotalItems === 0 ? 0 : (currentPage - 1) * validPageSize + 1;
  const endIndex = Math.min(currentPage * validPageSize, validTotalItems);

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-6 pb-5 gap-2 w-full">
      <div className="text-sm text-gray-600">
        Showing <strong>{startIndex}</strong> to <strong>{endIndex}</strong> of <strong>{validTotalItems}</strong> users
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition ${
            currentPage === totalPages || totalPages === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
