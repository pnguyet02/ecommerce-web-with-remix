import React from "react";

interface SearchSortFormProps {
  searchQuery: string;
  sort: string;
  baseUrl: string;
}

const SearchSortForm: React.FC<SearchSortFormProps> = ({
  searchQuery,
  sort,
  baseUrl,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 mb-6 space-y-4 md:space-y-0 md:space-x-6">
      {/* Tìm kiếm */}
      <form
        action={baseUrl}
        method="get"
        className="flex flex-col md:flex-row items-stretch md:items-center w-full md:space-x-4 space-y-4 md:space-y-0"
      >
        <input
          type="text"
          name="search"
          defaultValue={searchQuery}
          placeholder="Tìm kiếm sản phẩm"
          className="px-4 py-2 bg-gray-700 text-white rounded w-full md:w-80"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded w-full md:w-auto"
        >
          Tìm kiếm
        </button>
      </form>

      {/* Dropdown sắp xếp */}
      <form
        action={baseUrl}
        method="get"
        className="flex flex-col md:flex-row items-stretch md:items-center w-full md:space-x-4 space-y-4 md:space-y-0"
      >
        <select
          name="sort"
          defaultValue={sort}
          className="px-4 py-2 bg-gray-700 text-white rounded w-full md:w-auto"
        >
          <option value="price-asc">Giá thấp đến cao</option>
          <option value="price-desc">Giá cao đến thấp</option>
          <option value="name-asc">Tên A-Z</option>
          <option value="name-desc">Tên Z-A</option>
        </select>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded w-full md:w-auto"
        >
          Sắp xếp
        </button>
      </form>
    </div>
  );
};

export default SearchSortForm;
