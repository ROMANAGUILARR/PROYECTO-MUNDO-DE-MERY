import { apiRequest } from "@/lib/api-client";

export interface AdminUserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AdminProductResponse {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  status: boolean;
  categoryId: number;
  categoryName: string;
}

export interface AdminProductRequest {
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  status: boolean;
  categoryId: number;
}

// aca habia bug :'v
export interface AdminCategoryResponse {
  categoryId: number;
  categoryName: string;
  description: string;
  imageUrl: string;
  label: string;
}

export const adminService = {
  getUsers: () => apiRequest<AdminUserResponse[]>("/api/admin/users"),

  getCategories: () => apiRequest<AdminCategoryResponse[]>("/api/categories/list"),

  getProducts: () => apiRequest<AdminProductResponse[]>("/api/admin/products"),
  
  createProduct: (data: AdminProductRequest) => 
    apiRequest<AdminProductResponse>("/api/admin/products", { 
      method: "POST", 
      body: data 
    }),
    
  updateProduct: (id: number, data: AdminProductRequest) => 
    apiRequest<AdminProductResponse>(`/api/admin/products/${id}`, { 
      method: "PUT", 
      body: data 
    }),
    
  deleteProduct: (id: number) => 
    apiRequest<void>(`/api/admin/products/${id}`, { 
      method: "DELETE" 
    }),
};
