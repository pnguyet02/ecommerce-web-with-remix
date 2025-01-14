import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  sort: string;
  baseUrl: string;
  onPageChange: (page: number) => void; // Đảm bảo có hàm onPageChange để chuyển trang
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  searchQuery,
  sort,
  baseUrl,
  onPageChange, // Lấy hàm onPageChange từ props
}) => {
  const buildUrl = (page: number) => {
    // Tạo URL với các tham số hiện tại
    return `${baseUrl}?page=${page}&search=${searchQuery}&sort=${sort}`;
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)} // Chuyển trang về trang đầu
      >
        &laquo; Trang đầu
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)} // Chuyển trang về trang trước
      >
        Trang trước
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)} // Chuyển trang tới trang sau
      >
        Trang sau
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)} // Chuyển trang tới trang cuối
      >
        Trang cuối &raquo;
      </button>
      <span className="text-lg">
        Trang {currentPage} / {totalPages}
      </span>
    </div>
  );
};
export default Pagination;
