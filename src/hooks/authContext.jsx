import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import { supabase } from "../lib/supabase";


/**
 * Création du contexte
 * 
 * Le contexte permettra a nimporte quel composant
 * de récupérer l'utilisateur connecté
 */
const AuthContext = createContext(null);

/**
 * Provider d'authentification
 * 
 * Il envelopera toute notre app
 */
export function AuthProvider({ children }) {
    // Utilisateur actuellement connecté
    const [user, setUser] = useState(null);

    // Permet de savoir si supabase est encore
    // en train de vérifier la session.
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        /**
         * Au démarrage de l'application
         * on demande à supabase s'il existe
         * déja une session
         */
        async function loadSession() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            // Si une session existe,
            // on recupere l'utilisateur.
            setUser(session?.user ?? null);

            // La vérification initiale est terminée.
            setLoading(false);
        }

        loadSession();

        /**
         * On écoute ensuite les changements
         * d'état d'authentification
         * 
         * Exemple:
         * 
         * SIGNED_IN
         * SIGNED_OUT
         * TOKEN_REFRESHED
         * USER_UPDATED
         */
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (event, session) => {

                console.log(
                    "Auth event :",
                    event
                );

                setUser(session?.user ?? null);
            }
        );

        /**
         * Très important : 
         * 
         * Lorsque le composant est demonté,
         * nous supprimons l'abonnement.
         * 
         * Cela évite de laisser des listeners
         * inutile en mémoire.
         */
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    /**
     * Valeurs accessible à tous les composants
     * utilisant useAuth().
     */
    const value = {
        user,
        loading,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook perso permettant d'utiliser facilement notre contexte
 * 
 * Exemple :
 * 
 * const { user, loading } = useAuth();
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth doit être utilisé à l'intérieur de AuthProvider"
        );
    }
    return context;
}