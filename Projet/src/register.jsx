import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [Nom, setNom] = useState('');
    const [Email, setEmail] = useState('');

    // Etats pour afficher les erreurs et le message succès
    const [errorNameVisible, setErrorNameVisible] = useState(false);
    const [errorEmailVisible, setErrorEmailVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);

    async function register(e) {
        e.preventDefault();

        // Réinitialiser les erreurs
        setErrorNameVisible(false);
        setErrorEmailVisible(false);

        let valid = true;

        if (Nom.trim() === '') {
            setErrorNameVisible(true);
            valid = false;
        }

        if (Email.trim() === '') {
            setErrorEmailVisible(true);
            valid = false;
        }

        if (!valid) return;

        // Afficher le message succès
        setTimeout(() => setSuccessVisible(true), 700);

        setTimeout(() => setSuccessVisible(false), 4000);

        try {
            const res = await axios.post('http://localhost:3001/api/utilisateur', {
                Nom: Nom,
                Email: Email,
            });
            if (res.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-light d-flex justify-content-center align-items-start pt-5" style={{ minHeight: '100vh' }}>
            <div className="shadow-lg rounded-4 bg-white p-4 p-md-5" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="text-center mb-4">
                    <img src="https://img.icons8.com/ios-filled/50/login-rounded-right.png" alt="Logo" />
                </div>

                <h3 className="fw-bold text-dark mb-3 text-center">Bienvenue</h3>
                <p className="text-secondary text-center mb-4">Inscrit-toi pour accéder au site</p>

                <form onSubmit={register} className="mb-3">
                    {successVisible && (
                        <div className="alert alert-success" role="alert">
                            Compte créé avec succès ...
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
                        {errorNameVisible && (
                            <strong className="text-danger mt-2 d-block">Veuillez remplir ce champ</strong>
                        )}
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
                        {errorEmailVisible && (
                            <strong className="text-danger mt-2 d-block">Veuillez remplir ce champ</strong>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fs-5 mb-2">
                        Se connecter
                    </button>
                    <span className="text-md">
                        Vous avez déjà un compte ? <Link to="/login" className="text-md text-decoration-none">Connectez-vous</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Register;
