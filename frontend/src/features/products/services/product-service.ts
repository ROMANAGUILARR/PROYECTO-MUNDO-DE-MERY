import { apiRequest } from "@/lib/api-client";
import type { ProductDetail } from "@/types/product";

export function getProductById(productId: number) {
  return apiRequest<ProductDetail>(`/api/products/${productId}`);
}
