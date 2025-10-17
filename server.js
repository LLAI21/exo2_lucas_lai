import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/mesRoutes.js';
import connectDB from './src/config/db.js'
import connectSQL from './src/data/verifSQL.js'


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


//Connexion à MongoDB
connectDB();

//Connexion à mySQL
connectSQL()

//Vériier si le code est bien connecté au serveur
app.get("/health", (_req, res) => res.json({ status: "ok" }));

//Routes
app.use("/api/todos", router) // /api/todos/{route}

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


