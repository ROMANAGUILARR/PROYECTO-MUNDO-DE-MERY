import { apiRequest } from "@/lib/api-client";

// Interfaz para la respuesta de productos desde la API
export interface ApiProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  status: boolean;
  categoryId: number;
  categoryName: string;
}

// Interfaz para productos destacados en el frontend
export interface FeaturedProduct {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  etiqueta: string;
  formato: string;
  tonos: [string, string];
  image: string;
  alt: string;
}

// Convertir producto de API a formato FeaturedProduct
export function convertToFeaturedProduct(product: ApiProduct): FeaturedProduct {
  // Generar tonos basados en la categoría para mantener consistencia visual
  const categoryTones: Record<string, [string, string]> = {
    "Animales en cerámica": ["#d9bfae", "#b77d59"],
    "Frutas en cerámica": ["#c9b8a7", "#8d6b5a"],
    "Piezas temáticas": ["#e8d8c8", "#bc8b67"],
    "Dijes": ["#d9bfae", "#b77d59"],
    "Minis": ["#6b8e23", "#556b2f"],
    "Pulgas": ["#a0a0a0", "#708090"],
    "Small": ["#0f52ba", "#4169e1"],
    "Super Small": ["#dc143c", "#8b0000"],
  };

  const defaultTones: [string, string] = ["#d9bfae", "#b77d59"];
  const tonos = categoryTones[product.categoryName] || defaultTones;

  // Generar descripción básica si no existe
  const descripcion = `Hermosa pieza de cerámica ${product.categoryName.toLowerCase()}, elaborada artesanalmente con acabados de alta calidad.`;

  // Determinar etiqueta basada en stock
  let etiqueta = "NUEVO";
  if (product.stock === 0) {
    etiqueta = "AGOTADO";
  } else if (product.stock < 10) {
    etiqueta = "ÚLTIMOS";
  }

  // Determinar formato basado en categoría
  const formato = product.categoryName;

  return {
    id: product.id,
    nombre: product.name,
    precio: product.price,
    descripcion,
    etiqueta,
    formato,
    tonos,
    image: product.imageUrl,
    alt: product.name,
  };
}

// Obtener productos destacados desde la API
export async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  try {
    // Intentar obtener productos desde el endpoint público de productos
    const products = await apiRequest<ApiProduct[]>("/api/products");
    
    // Filtrar solo productos activos y obtener los últimos 8 (más recientes)
    const activeProducts = products
      .filter(p => p.status)
      .sort((a, b) => b.id - a.id) // Ordenar por ID descendente (más recientes primero)
      .slice(0, 8); // Obtener los últimos 8
    
    return activeProducts.map(convertToFeaturedProduct);
  } catch (error) {
    console.error("Error al obtener productos destacados:", error);
    return [];
  }
}

// Obtener todos los productos activos
export async function getAllActiveProducts(): Promise<FeaturedProduct[]> {
  try {
    const products = await apiRequest<ApiProduct[]>("/api/products");
    return products
      .filter(p => p.status)
      .map(convertToFeaturedProduct);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}
