export interface Product {
    id: string | number;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    sizes: string[];
    [key: string]: unknown;
}