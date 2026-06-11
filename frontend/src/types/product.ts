export interface ProductDetail {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl: string;
    status: boolean;
    categoryName: string;
    description: string;
    sizes: ProductSize[];
    relatedProducts: RelatedProduct[];
}

export interface ProductSize {
    id: number;
    name: string;
    dimension: string;
    price: number;
}

export interface RelatedProduct {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}
