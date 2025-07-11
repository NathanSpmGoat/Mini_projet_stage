import React, { useEffect, useState } from 'react';

function Accueil() {
    const [utilisateur, setUtilisateur] = useState(null);

    useEffect(() => {
        const user = sessionStorage.getItem('utilisateur');
        if (user) {
            setUtilisateur(JSON.parse(user));
        }
    }, []);

    if (!utilisateur) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                <p>Utilisateur non connecté.</p>
            </div>
        );
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
            <h1>Bienvenue, {utilisateur.Nom || 'Utilisateur'} !</h1>
            <p>ID : {utilisateur.id || 'N/A'}</p>
            <p>Nom : {utilisateur.Nom || 'N/A'}</p>
            <p>Email : {utilisateur.Email || 'N/A'}</p>
        </div>
    );
}

export default Accueil;
