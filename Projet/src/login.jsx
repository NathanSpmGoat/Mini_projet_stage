import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState('');
    const [Nom, setNom] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setErrorVisible(false);

        if (!Email.trim() || !Nom.trim()) {
            setErrorVisible(true);
            return;
        }

        try {
            const res = await axios.post('http://localhost:3001/api/utilisateur/login', {
                Email,
                Nom,
            });

            if (res.status === 200) {
                const utilisateur = res.data.utilisateur; // récupère les infos renvoyées par le backend

                // Stocker dans sessionStorage (ou localStorage selon choix)
                sessionStorage.setItem('utilisateur', JSON.stringify(utilisateur));

                // Redirige vers la page d'accueil ou dashboard
                sessionStorage.setItem('utilisateur', JSON.stringify(res.data.utilisateur));
                navigate('/accueil');
            }
        } catch (error) {
            console.log(error);
            setErrorVisible(true);
        }
    }

    return (
        <div className="bg-light d-flex justify-content-center align-items-start pt-5" style={{ minHeight: '100vh' }}>
            <div className="shadow-lg rounded-4 bg-white p-4 p-md-5" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="text-center mb-4">
                    <img src="https://img.icons8.com/ios-filled/50/login-rounded-right.png" alt="Logo" />
                </div>

                <h3 className="fw-bold text-dark mb-3 text-center">Connexion</h3>
                <p className="text-secondary text-center mb-4">Connecte-toi pour accéder au site</p>

                <form onSubmit={handleLogin}>
                    {errorVisible && (
                        <div className="alert alert-danger" role="alert">
                            Identifiants incorrects ou champ vide.
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="nom" className="form-label fw-medium text-dark">Nom</label>
                        <input
                            type="text"
                            name="nom"
                            id="nom"
                            className="form-control"
                            placeholder="Ex : Nathan Pakou"
                            value={Nom}
                            onChange={e => setNom(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="form-label fw-medium text-dark">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Example@gmail.com"
                            value={Email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100 fs-5 mb-2">
                        Se connecter
                    </button>
                    <span className="text-md">
                        Pas encore de compte ? <Link to="/" className="text-md text-decoration-none">Inscris-toi</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;
