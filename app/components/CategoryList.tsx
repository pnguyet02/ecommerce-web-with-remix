// app/components/CategoryList.tsx
import React from "react";

interface CategoryData {
  id: number;
  name: string;
}

interface CategoryListProps {
  categories: CategoryData[];
  baseUrl: string; // Thêm baseUrl vào props
  onSelect: (categoryId: number) => void;
  selectedCategoryId?: number;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  baseUrl,
  onSelect,
  selectedCategoryId,
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded">
      <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <a
              href={`${baseUrl}?categoryId=${category.id}`} // Xây dựng URL với baseUrl và categoryId
              className={`block py-2 px-4 rounded ${
                category.id === selectedCategoryId
                  ? "bg-blue-500"
                  : "bg-gray-700"
              }`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(category.id);
              }}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
