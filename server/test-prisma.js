const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
        console.log('Connexion à la DB réussie !');
    } catch (e) {
        console.error('Erreur connexion DB:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
