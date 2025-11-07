// ===================================================================
// Fichier d'initialisation de la base de données MongoDB
// ===================================================================

// On définit la base de données de développement
const dbName = "devdb";

// On récupère ou crée la base
db = db.getSiblingDB(dbName);

// Création des collections principales si elles n'existent pas déjà
if (!db.getCollectionNames().includes("users")) {
    db.createCollection("users");
    print("✅ Collection 'users' créée");
}
// === RATES ===
if (!db.getCollectionNames().includes("rates")) {
    db.createCollection("rates");
    print("✅ Collection 'rates' créée");
}

if (!db.getCollectionNames().includes("perfumes")) {
    db.createCollection("perfumes");
    print("✅ Collection 'perfumes' créée");
}

// if (!db.getCollectionNames().includes("famillesolfactives")) {
//     db.createCollection("famillesolfactives");
//     print("✅ Collection 'famillesolfactives' créée");
// }

// if (!db.getCollectionNames().includes("maisonsparfum")) {
//     db.createCollection("maisonsparfum");
//     print("✅ Collection 'maisonsparfum' créée");
// }

// Ajout d'index utiles (par exemple pour les recherches et contraintes d’unicité)
db.users.createIndex({ email: 1 }, { unique: true });
db.perfumes.createIndex({ name: 1 });
db.rates.createIndex({ userId: 1, perfumeId: 1 }, { unique: true });
// db.famillesolfactives.createIndex({ nom: 1 });
// db.maisonsparfum.createIndex({ nom: 1 });

print("📦 Base '" + dbName + "' initialisée avec succès !");
