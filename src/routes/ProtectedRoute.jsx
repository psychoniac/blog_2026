import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/authContext";

function ProtectedRoute() {

    /*
     *  Récupération de l'utilisateur 
     *  et de l'état de chargement. 
     */
    const {
        user,
        loading,
    } = useAuth();

    /*
     * Supabase est encore en train de vérifier la session.
     * Nous ne devons pas rediriger immédiatement vers /login.
     */
    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>
                    Vérification de la session ...
                </p>
            </div>
        );
    }
    /*
     *  Aucun utilisateur connecté. 
     *  On redirige vers la page de connexion. 
     */
    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    /*
    *
    *   Outlet represente la route enfant
    *   qui sera affichée.
    *   
    */
    return <Outlet />
}

export default ProtectedRoute;