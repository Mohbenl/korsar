import { supabase } from "@/lib/supabase";

export interface Product {
    id?: string;
    name: string;
    price: number;
    categorie: string;
    image?: string | null;
    rating: number;
    quantity: number;
    sizes: string[] | string | null;
    description?: string;
    details?: string[];
}

// CREATE
export async function createProduct(product: Product) {
    const { data, error } = await supabase
        .from("products")
        .insert([product])
        .select();

    if (error) throw error;
    return data;
}

// READ
export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
}

// UPDATE
export async function updateProduct(id: string, product: Product) {
    const { data, error } = await supabase
        .from("products")
        .update(product)
        .eq("id", id)
        .select();

    if (error) throw error;
    return data;
}

// DELETE
export async function deleteProduct(id: string) {
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) throw error;
}

export async function uploadProductImage(file: File) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

    return data.publicUrl;
}



export async function getProductById(id: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;

    let sizes: string[] = [];

    if (Array.isArray(data.sizes)) {
        sizes = data.sizes;
    } else if (typeof data.sizes === "string") {
        try {
            sizes = JSON.parse(data.sizes);
        } catch {
            sizes = data.sizes.split(",");
        }
    }

    return {
        ...data,
        sizes,
        images: data.images || [],
    };
}

export async function getProductsCount() {
    const { count, error } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

    if (error) throw error;

    return count ?? 0;
}