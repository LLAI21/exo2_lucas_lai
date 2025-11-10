import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/mesRoutes.js';
import connectDB from './src/config/db.js'
import connectSQL from './src/data/verifSQL.js'
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json');
import jwt from 'jsonwebtoken';
import User from './src/models/userModel.js';
import mongoose from "mongoose";
// import pg from "./src/config/dbPostgress.js"


//Appeler dotenv
dotenv.config();

// Initialisation de l'application Express
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/todos', router); // ou juste app.use(router) selon ta structure

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//Apperler jwt
app.post("/login", async (req, res, next) => {
  let { username, password } = req.body; //Récupération des données
  let existingUser; //Utilisateur existant

  //Vérification de l'utilisateur
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError("Erreur de connexion, réessayez plus tard", 500);
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Identifiants invalides, réessayez", 401);
    return next(error);
  }
});

//Crée l'utilisateur
app.post("/signup",
  async (req, res, next) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password, });
    try { await newUser.save(); }
    catch {
      const error = new Error("Erreur sur la création de l'utilisateur");
      return next(error);
    }

    //Génération du token JWT
    let token;
    try { //Création du token
      token = jwt.sign({ userId: existingUser.id, username: existingUser.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    } catch (err) {
      const error = new HttpError("Erreur de connexion, réessayez plus tard", 500);
      return next(error);
    }
    res.status(200).json({ userId: existingUser.id, username: existingUser.username, token: token });
  });


//Avoir l'accès au ressource
app.get('/accessResource',
  (req, res) => {
    const token =
      req.headers
        .authorization.split(' ')[1]; //split sert à couper 1 élément pour en faire plusieurs
    //Authorization: 'Bearer TOKEN'
    if (!token) {
      res.status(200)
        .json(
          {
            success: false,
            message: "Error!Token was not provided."
          }
        );
    }
    //Decoding the token
    const decodedToken =
      jwt.verify(token, "secretkeyappearshere");
    res.status(200).json(
      {
        success: true,
        data: {
          userId: decodedToken.userId,
          email: decodedToken.email
        }
      }
    );
  })

//Test de onnexion à MongoDB
connectDB();

//Connexion à mySQL
connectSQL();

// //Connexion à postgress
// pg();

//Vériier si le code est bien connecté au serveur
app.get("/health", (_req, res) => res.json({ status: "ok" }));

//Démarrage du serveur
app.listen(process.env.PORT || 3000, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT || 3000}`);
});
app.use("/api/todos", router) // /api/todos/{route}

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

//Connexion à mongodb
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    app.listen("3000", () => {
      console.log("Server is listening on port 3000");
    });
  }).catch((err) => { console.log("Error Occurred"); }
  );



