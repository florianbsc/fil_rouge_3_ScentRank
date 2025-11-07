
import app from "./app";
import { connectDB } from "./config/db";
import { config } from "./config/env";

connectDB().then(() => {
    app.listen(config.port, () => {
        console.log(`🚀 Le serveur Express est en fonctionnement http://localhost:${config.port}`);
    });
});
