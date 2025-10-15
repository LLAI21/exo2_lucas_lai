const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware pour parser JSON
app.use(bodyParser.json());

// Liste des tâches en mémoire
let tasks = [];

// Route pour afficher toutes les tâches
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Route pour ajouter une tâche
app.post('/add', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Le titre de la tâche est requis.' });
  }

  const newTask = { id: Date.now(), title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Route pour supprimer une tâche par id
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id != id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Tâche non trouvée.' });
  }

  res.json({ message: 'Tâche supprimée avec succès.' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
