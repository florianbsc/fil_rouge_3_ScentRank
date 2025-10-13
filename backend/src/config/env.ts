// import dotenv from "dotenv";
// dotenv.config();
//
// export const config = {
//     port: process.env.PORT || 3000,
//     MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/scentrank",
//     env: process.env.NODE_ENV || "development",
//     jwtSecret: process.env.JWT_SECRET || "changeme-secret",
// };


import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/scentrank",
    env: process.env.NODE_ENV || "development",
    jwtSecret: process.env.JWT_SECRET || "changeme-secret",
};
