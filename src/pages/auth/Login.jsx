import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authServices";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            /*
             * Connexion via notre service. 
             */
            const data = await loginUser(
                email,
                password
            );

            console.log(
                "Connexion réussie :",
                data
            );

            /*
             *  L'évènement SIGNED_IN sera également
             *  détécté par AuthContext 
             */
            navigate("/dashboard");
        } catch (error) {
            console.error(
                "Erreur de connexion :",
                error
            );

            setError(
                "Email ou mot de passe incorrect."
            );

        } finally {

            setLoading(false);
        }
    }
    return (
        <main>
            <div className="min-h-screen max-w-100vh wrap items-center justify-center">
                <h1 className="text-3xl font-bold">Connexion</h1>
                <p className="mt-2 text-slate-400">
                    Connecte toi a ton espace personnel.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label htmlFor="email" className="mb-2">
                            Email
                        </label>

                        <input type="email" id="email" value={email} onChange={(event) =>
                            setEmail(event.target.value)
                        } required className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500" />
                    </div>

                    <div>

                        <label htmlFor="password" className="mb-2">
                            Mot de passe
                        </label>

                        <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)
                        } required className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    {error && (

                        <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-red-300">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium hover:bg-blue-500 disabled:opacity-50"
                    >

                        {loading
                            ? "Connexion..."
                            : "Se connecter"
                        }

                    </button>

                </form>


                <p className="mt-6 text-center text-slate-400">

                    Pas encore de compte ?

                    {" "}

                    <Link
                        to="/register"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Créer un compte
                    </Link>

                </p>

            </div>

        </main>

    )
}

export default Login;
