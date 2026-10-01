import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authServices";

function Register() {
    /*
     * Valeurs du formulaire.
     */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    /*
     * Gestion des états d'interface. 
     */
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    /*
     *  Permet de naviguer vers une autre route
     * après une connexion réussie
     */
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        // on nettoie les anciens messages.
        setError("");
        setSuccess("");

        /*
         *  Première validation :
         *  les deux mots de passe doivent être identiques. 
         */
        if (password !== confirmPassword) {
            setError(
                "Les mots de passe ne correspondent pas."
            );
            return;
        }

        /*
         *  Empêche d'envoyer plusieurs fois
         *  le formulaire pendant la requête. 
         */
        setLoading(true);

        try {

            /*
             *  Appel de notre service. 
             */
            const data = await registerUser(
                email,
                password
            );

            console.log(
                "Utilisateur créé :",
                data
            );

            /*
             *  Selon la configuration de Supabase,
             *  une confirmation email peut être nécessaire. 
             */
            setSuccess(
                "Compte créé. Vérifie ton adresse email si une confirmation est demandée."
            );

            /*
             *  Pour le moment, nous attendons quelques secondes
             *  avant de revenir à la connexion. 
             */
            setTimeout(() => {
                navigate("/login");
            }, 2500);
        } catch (error) {
            console.error(
                "Erreur d'inscription :",
                error
            );

            setError(
                error.message ||
                "Une erreur est survenu lors de l'inscription."
            );
        } finally {

            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold">Créer un compte</h1>
                <p className="mt-2 text-slate-400">
                    Rejoins le blog portfolio.
                </p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {/* EMAIL */}

                    <div>
                        <label htmlFor="email" className="block mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>
                    {/* MOT DE PASSE */}

                    <div>

                        <label
                            htmlFor="password"
                            className="block mb-2"
                        >
                            Mot de passe
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                            minLength={6}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>


                    {/* CONFIRMATION */}

                    <div>

                        <label
                            htmlFor="confirmPassword"
                            className="block mb-2"
                        >
                            Confirmer le mot de passe
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            required
                            minLength={6}
                            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
                        />

                    </div>


                    {/* MESSAGE D'ERREUR */}

                    {error && (

                        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-red-300">
                            {error}
                        </div>

                    )}


                    {/* MESSAGE DE SUCCÈS */}

                    {success && (

                        <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-4 text-green-300">
                            {success}
                        </div>

                    )}

                    {/* BOUTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium hover:bg-blue-500 disabled:opacity-50"
                    >

                        {loading
                            ? "Création du compte..."
                            : "Créer mon compte"
                        }

                    </button>

                </form>


                <p className="mt-6 text-center text-slate-400">

                    Déjà inscrit ?

                    {" "}

                    <Link
                        to="/login"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Se connecter
                    </Link>
                </p>
            </div>

        </main>
    )
}
export default Register;
