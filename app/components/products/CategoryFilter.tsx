//hiển thị dropdown lọc danh mục.
import { Link } from "@remix-run/react";
import { Category } from "~/types"; // Import Category kiểu dữ liệu

interface CategoryFilterProps {
  categories: Category[];
  currentCategory: number;
}

export default function CategoryFilter({
  categories,
  currentCategory,
}: CategoryFilterProps) {
  return (
    <div>
      <select
        name="category"
        defaultValue={currentCategory}
        className="px-4 py-2 bg-gray-700 text-white rounded"
        onChange={(e) => {
          const selectedCategory = e.target.value;
          window.location.search = `?page=1&category=${selectedCategory}`;
        }}
      >
        <option value="0">Tất cả danh mục</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
