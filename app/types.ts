export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  createdAt: Date;
  categoryId: number | null;
  category: CategoryData | null;
};

export interface CategoryData {
  id: number;
  name: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
export type LoaderData = {
  user: User | null;
  products: Product[];
  totalPages: number;
  currentPage: number;
  searchQuery: string;
  sort: string;
  categories: CategoryData[];
};
// types.ts
export interface BlogCategory {
  id: number;
  name: string;
}

export interface Blog {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  blogCategoryId: number;
  category: BlogCategory;
  createdAt: string;
  updatedAt: string;
}
// export interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number; // Quantity of this product in the cart
// }
export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
