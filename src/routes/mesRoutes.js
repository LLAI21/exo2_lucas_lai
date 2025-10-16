import express from 'express';
import TodoController from '../controllers/monControllers.js';

const router = express.Router();

// 📝 Route pour lister toutes les tâches
router.get('/', TodoController.list);

// ➕ Route pour ajouter une nouvelle tâche
router.post('/add', TodoController.add);

// ❌ Route pour supprimer une tâche par ID
router.delete('/delete/:id', TodoController.delete);

export default router;
