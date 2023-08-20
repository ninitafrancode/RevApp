export interface User{
    uid?: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    image?: string;
    typeUser?: string;
    password?: string;
    reviews?: Review[];
}

export interface Review{
    user_id: string;
    description?: string;
    rating: number;
}