const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Route POST pour créer un utilisateur
app.post('/api/utilisateur', async (req, res) => {
    const { Nom, Email } = req.body;

    try {
        const nouvelUtilisateur = await prisma.User_infos.create({
            data: { Nom, Email }
        });
        res.status(201).json(nouvelUtilisateur);
    } catch (error) {
        console.error("Erreur lors de l'insertion :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Route POST pour connecter un utilisateur
app.post('/api/utilisateur/login', async (req, res) => {
    const { Nom, Email } = req.body;

    try {
        const utilisateur = await prisma.User_infos.findFirst({
            where: {
                Nom: Nom,
                Email: Email
            }
        });

        if (utilisateur) {
            res.status(200).json({ message: "Connexion réussie", utilisateur });
        } else {
            res.status(401).json({ message: "Nom ou email incorrect" });
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.get('/', (req, res) => {
    res.send('Bienvenue sur l’API Node.js');
});

// ✅ Lancement du serveur
app.listen(3001, () => {
    console.log('Serveur Node.js lancé sur http://localhost:3001');
});
