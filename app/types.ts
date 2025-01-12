export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
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
  user: { userId: string; name: string; email: string; role: string } | null;
};
