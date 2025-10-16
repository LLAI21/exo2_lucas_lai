import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/mesRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Vériier si le code est bien connecté au serveur
app.get("/health", (_req, res) => res.json({ status: "ok" }));

//Routes
app.use("/api/todos", router) // /api/todos/{route}

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

// // Route pour ajouter une tâche
// app.post('/add', (req, res) => {
//   const { title } = req.body;
//   if (!title) {
//     return res.status(400).json({ error: 'Le titre de la tâche est requis.' });
//   }

//   const newTask = { id: Math.floor(Math.random() * 100), title };
//   tasks.push(newTask);
//   res.status(201).json(newTask);
// });

// // Route pour supprimer une tâche par id
// app.delete('/delete/:id', (req, res) => {
//   const { id } = req.params;
//   const initialLength = tasks.length;
//   tasks = tasks.filter(task => task.id != id);

//   if (tasks.length === initialLength) {
//     return res.status(404).json({ error: 'Tâche non trouvée.' });
//   }

//   res.json({ message: 'Tâche supprimée avec succès.' });
// });

