import { Product } from "~/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Định nghĩa các props cho AdminProductList
interface AdminProductListProps {
  products: Product[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

// Component ProductCard hiển thị thông tin sản phẩm và có các nút chỉnh sửa và xóa
const ProductCard: React.FC<{
  product: Product;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}> = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/products/${product.id}/edit`); // Điều hướng đến trang chỉnh sửa sản phẩm
  };

  const handleDelete = () => {
    if (window.confirm(`Bạn chắc chắn muốn xóa sản phẩm "${product.name}"?`)) {
      onDelete(product.id); // Gọi hàm xóa sản phẩm
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded flex flex-col">
      {/* Hình ảnh và thông tin sản phẩm */}
      <div className="flex-grow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-400">{product.description}</p>
        <p className="text-lg font-bold text-blue-400">${product.price}</p>
        <p className="text-sm text-gray-400">Còn lại: {product.stock}</p>
      </div>

      {/* Nút Sửa và Xóa */}
      <div className="flex mt-4 space-x-2">
        <button
          onClick={handleEdit}
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sửa
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

// Component AdminProductList hiển thị danh sách sản phẩm
export default function AdminProductList({
  products,
  onEdit,
  onDelete,
}: AdminProductListProps) {
  // Tạo state để lưu danh sách sản phẩm đã được xóa
  const [productList, setProductList] = useState<Product[]>(products);

  // Hàm xử lý xóa sản phẩm
  const handleDelete = (id: number) => {
    const updatedProductList = productList.filter(
      (product) => product.id !== id
    );
    setProductList(updatedProductList);
    // có thể gọi API để xóa sản phẩm trên server.
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={handleDelete} // Truyền hàm xóa vào ProductCard
        />
      ))}
    </div>
  );
}
