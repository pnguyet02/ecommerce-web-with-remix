// ~/components/products/CategoryFilter.tsx
import { Link } from "@remix-run/react";

interface CategoryFilterProps {
  categories: { id: number; name: string }[];
  baseUrl: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  baseUrl,
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4">Danh mục sản phẩm</h3>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-2">
            <Link
              to={`${baseUrl}?categoryId=${category.id}`} // Sử dụng categoryId thay vì category
              className="text-blue-500 hover:text-blue-300"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
