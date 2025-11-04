// Ce script s'exécute automatiquement à l'initialisation du conteneur Mongo.
// Il crée la base "devdb" et un utilisateur avec les bons droits.

db = db.getSiblingDB("devdb");

// Création d'un utilisateur pour le backend
db.createUser({
    user: "devuser",
    pwd: "devpass",
    roles: [
        {
            role: "readWrite",
            db: "devdb",
        },
    ],
});

// Création d'une collection "perfumes" avec un index exemple
db.createCollection("perfumes");
db.perfumes.createIndex({ name: 1 }, { unique: true });

// Optionnel : insérer quelques données de test
db.perfumes.insertMany([
    {
        name: "Dior Sauvage",
        house: "Dior",
        description: "Un parfum frais et puissant avec des notes boisées et aromatiques.",
        price: 120,
        gender: "Homme",
        family: "Boisé Aromatique",
        rating: 4.8,
    },
    {
        name: "Chanel No.5",
        house: "Chanel",
        description: "Un classique floral avec des notes d’ylang-ylang, jasmin et rose.",
        price: 150,
        gender: "Femme",
        family: "Floral Aldéhydé",
        rating: 4.9,
    },
]);

print("✅ Base devdb initialisée avec succès !");
