export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  createdAt: Date;
  categoryId: number | null;
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
  user: {
    userId: string;
    name: string;
    email: string;
    role: string;
  } | null;
  products: Product[];
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
export interface CartItem {
  name: string;
  price: number;
}
