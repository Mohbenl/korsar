import { supabase } from "@/lib/supabase";

export type OrderStatus =
    | "En Attente"
    | "Confirmer"
    | "Livrer"
    | "Annuler"
    | "Retour";

export interface OrderItem {
    id?: string;
    order_id?: string;
    product_id: string;
    quantite: number;
    taille: string;
    prix: number;
    product?: {
        name: string;
        image: string;
    };
}

export interface Order {
    id?: string;
    nom: string;
    prenom: string;
    telephone: string;
    adresse: string;
    wilaya: string;
    total: number;
    statut: OrderStatus;
    created_at?: string;
    items?: OrderItem[];
}



export async function createOrder(
    order: {
        nom: string;
        prenom: string;
        telephone: string;
        adresse: string;
        wilaya: string;
        total: number;
    },
    items: {
        product_id: string;
        quantite: number;
        taille: string;
        prix: number;
    }[]
) {
    // 1. CREATE ORDER
    const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
            {
                nom: order.nom,
                prenom: order.prenom,
                telephone: order.telephone,
                adresse: order.adresse,
                wilaya: order.wilaya,
                total: order.total,
                statut: "En Attente",
            },
        ])
        .select()
        .single();

    if (orderError) throw orderError;

    // 2. CREATE ITEMS
    const formattedItems = items.map((item) => ({
        order_id: orderData.id,
        product_id: item.product_id,
        quantite: item.quantite,
        taille: item.taille,
        prix: item.prix,
    }));

    const { error: itemsError } = await supabase
        .from("order_items")
        .insert(formattedItems);

    if (itemsError) throw itemsError;

    return orderData;
}

// LISTE SIMPLE (tableau)
export async function getOrders() {
    const { data, error } = await supabase.rpc("get_orders");

    if (error) throw error;

    return Array.isArray(data) ? data : [];
}

// DÉTAIL COMPLET (MODAL)
export async function getOrderItems(id: string) {
    const { data, error } = await supabase.rpc("get_order_items", {
        p_order_id: id
    } );

    if (error) throw error;
    return data;
}

// UPDATE STATUS
export async function updateOrderStatus(id: string, statut: OrderStatus) {
    const { error } = await supabase
        .from("orders")
        .update({ statut })
        .eq("id", id);

    if (error) throw error;
}

// DELETE ORDER
export async function deleteOrder(id: string) {
    await supabase.from("order_items").delete().eq("order_id", id);

    const { error } = await supabase.from("orders").delete().eq("id", id);

    if (error) throw error;
}

export async function getOrdersCount() {
    const { count, error } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

    if (error) throw error;

    return count ?? 0;
}