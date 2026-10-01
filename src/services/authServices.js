import { supabase } from "../lib/supabase.js"

/**
 * Inscription d'un nouvel utlisateur
 * 
 * Supabase crée le compte dans auth.users
 */
export async function registerUser(email, password){
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error){
        throw error;
    }

    return data;
}

/**
 * Connexion d'un utlisateur existant
 */
export async function loginUser(email, password){
    const { data, error} = 
        await supabase.auth.signInWithPassword({
            email,
            password,
        });

    if (error){
        throw error;
    }

    return data;
}

/**
 * Déconnexion de l'utilisateur courant
 */
export async function logoutUser(){
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }
}