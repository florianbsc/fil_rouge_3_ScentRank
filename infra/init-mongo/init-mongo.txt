// // init-mongo.js
//
// // Sélection de la base
// db = db.getSiblingDB('devdb');
//
// // Création utilisateur
// db.createUser({
//     user: "devuser",
//     pwd: "devpass",
//     roles: [{ role: "readWrite", db: "devdb" }]
// });
// print("✅ Utilisateur Mongo 'devuser' créé");
//
// // Crée la collection "users" si elle n’existe pas
// if (!db.getCollectionNames().includes("users")) {
//     db.createCollection("users");
//     print("📦 Collection 'users' créée");
// }
//
// // === UTILISATEUR test ===
// if (!db.users.findOne({ email: "jean.dupont@example.com" })) {
//     db.users.insertOne({
//         nomUtilisateur: "dupont",
//         prenomUtilisateur: "Jean",
//         age: 28,
//         genre: "Homme",
//         email: "jean.dupont@example.com",
//         motDePasseHash: "hashedpassword123",
//         dateInscription: new Date(),
//         avatarURL: "https://example.com/avatar1.jpg",
//         bio: "Amateur de parfums",
//         pointsContributions: 0,
//         statutActif: true,
//     });
// }
//
// // === Admin User ===
// const adminEmail = "admin@scentrank.com";
// const adminPassword = "admin123"; // TODO: hashé via Node avant export
//
// if (!db.users.findOne({ email: adminEmail })) {
//     db.users.insertOne({
//         email: adminEmail,
//         password: adminPassword,
//         role: "admin",
//         createdAt: new Date(),
//     });
//     print(`👑 Admin créé : ${adminEmail}`);
// } else {
//     print("ℹ️ Admin déjà existant");
// }
//
// // === Roles ===
// if (db.roles.countDocuments() === 0) {
//     db.roles.insertMany([
//         { nom: "admin" },
//         { nom: "user" },
//         { nom: "invité" },
//     ]);
//     print("🎭 Rôles ajoutés");
// }
//
// // === Maisons ===
// if (db.maisonsparfum.countDocuments() === 0) {
//     db.maisonsparfum.insertOne({
//         nom: "Dior",
//         paysOrigine: "France",
//         dateFondation: new Date("1946-01-01"),
//         siteWeb: "https://www.dior.com"
//     });
//     print("🏠 Maison Dior ajoutée");
// }
//
// // === Familles Olfactives ===
// db.createCollection("famillesolfactives");
//
// if (db.famillesolfactives.countDocuments() === 0) {
//     db.famillesolfactives.insertMany([
//         {
//             nom: "CITRUS SMELLS",
//             description: "Notes fraîches et pétillantes issues des agrumes comme le citron, la bergamote ou l’orange."
//         },
//         {
//             nom: "FRUITS, VEGETABLES AND NUTS",
//             description: "Notes fruitées, végétales ou gourmandes provenant de fruits, légumes ou noix."
//         },
//         {
//             nom: "FLOWERS",
//             description: "Famille florale classique regroupant les senteurs de diverses fleurs naturelles."
//         },
//         {
//             nom: "WHITE FLOWERS",
//             description: "Sous-famille florale avec des fleurs blanches intenses et sensuelles comme le jasmin ou le gardénia."
//         },
//         {
//             nom: "GREENS, HERBS AND FOUGERES",
//             description: "Notes vertes et herbacées rappelant les feuilles, herbes et fougères."
//         },
//         {
//             nom: "SPICES",
//             description: "Famille épicée avec des notes chaudes ou piquantes telles que la cannelle, le poivre ou le clou de girofle."
//         },
//         {
//             nom: "SWEETS AND GOURMAND SMELLS",
//             description: "Notes sucrées et gourmandes évoquant la vanille, le chocolat, le caramel ou les pâtisseries."
//         },
//         {
//             nom: "WOODS AND MOSSES",
//             description: "Famille boisée et terreuse comprenant le santal, le cèdre, le vétiver et les mousses."
//         },
//         {
//             nom: "RESINS AND BALSAMS",
//             description: "Notes ambrées et résineuses issues de la myrrhe, du benjoin ou de l’encens."
//         },
//         {
//             nom: "MUSK, AMBER, ANIMALIC SMELLS",
//             description: "Famille sensuelle et profonde regroupant le musc, l’ambre et les notes animales."
//         },
//         {
//             nom: "BEVERAGES",
//             description: "Notes inspirées de boissons comme le café, le thé, le vin ou le rhum."
//         },
//         {
//             nom: "NATURAL AND SYNTHETIC, POPULAR AND WEIRD",
//             description: "Famille expérimentale mêlant des notes naturelles, synthétiques ou atypiques."
//         },
//         {
//             nom: "UNCATEGORIZED",
//             description: "Notes diverses ne correspondant à aucune catégorie précise."
//         }
//     ]);
//     print("🌸 Familles olfactives insérées");
// }
//
// // === PARFUMS ===
// // db.createCollection("perfumes");
// // if (db.perfumes.countDocuments() === 0) {
// //     db.perfumes.insertMany([
// //         {
// //             name: "Bleu de Chanel",
// //             brand: "Chanel",
// //             description: "Boisé, frais et élégant.",
// //             gender: "male",
// //             imageUrl: "https://www.avenue-des-parfums.fr/93820-large_default/bleu-de-chanel-eau-de-parfum-vaporisateur.jpg",
// //             olfactoryNotes: {
// //                 top: ["Pamplemousse","Citron","Menthe","Bergamote","Poivre Rose","Aldéhydes", "Coriande"],
// //                 heart: ["Gingembre","Noix de muscade","Jasmin","Melon"],
// //                 base: ["Encens", "Ambre","Cèdre","Bois de santal", "Patchouli", "Bois Ambrée", "Ciste"],
// //             },
// //             price: NumberDecimal("155.00"),
// //             releaseYear: 2014,
// //         },
// //         {
// //             name: "Dior Sauvage",
// //             brand: "Dior",
// //             description: "Frais et vibrant.",
// //             gender: "male",
// //             olfactoryNotes: {
// //                 top: ["Bergamote de Calabria","Poivre"],
// //                 heart: ["Poivre du Sichuan","Lavande","Poivre rose","Vétiver", "Patchouli", "Géranium", "Élémi"],
// //                 base: ["Ambroxan","Cèdre", "Ciste"],
// //             },
// //             price: NumberDecimal("89.00"),
// //             releaseYear: 2015,
// //         },
// //         {
// //             name: "Black Orchid",
// //             brand: "Tom Ford",
// //             gender: "unisex",
// //             olfactoryNotes: {
// //                 top: ["Truffe", "Gardénia","Cassis","Ylang-ylang", "Jasmin", "Bergamote", "Mandarine", "Limone Costa d'Amalfi"],
// //                 heart: ["Orchidée","Épices","Gardénia","Notes fruitées", "Ylang-ylang", "Jasmin", "Lotus"],
// //                 base: ["Chocolat du Mexique","Patchouli", "Vanille", "Encens", "Ambre", "Bois de santal", "Vétiver", "Musc blanc"],
// //             },
// //             description: "Épicé et mystérieux.",
// //             price: NumberDecimal("168.00"),
// //             releaseYear: 2006,
// //         },
// //     ]);
// //     print("💐 Parfums insérés");
// // }
//
// print("🚀 Script d’initialisation Mongo terminé avec succès !");