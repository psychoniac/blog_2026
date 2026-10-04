import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { useAuth } from "../../hooks/authContext";
import { logoutUser } from "../../services/authServices";


function Dashboard() {
    const {
        user,
    } = useAuth();

    const navigate = useNavigate();

    async function handleLogout() {

        try {
            await logoutUser();

            /*
             *  Après la déconnexion,
             * on retourne vers l'accueil 
             */
            navigate("/");
        } catch (error) {
            console.error(
                "Erreur lors de la déconnexion : ",
                error
            );
        }
    }

    return (
        <main className="min-h-screen bg-slate-100">

            <div className="max-w-5xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                        <p className="mt-4 text-slate-600">
                            Bienvenue {user?.email}
                        </p>

                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">
                        <LogOut size={18} />
                        Déconnexion
                    </button>
                </div>
            </div>
        </main>


    )
}
export default Dashboard;
