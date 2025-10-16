import Todo from "../models/monModel.js";

const todoModel = new Todo();

export default class TodoController {
    static list(req, res) {
        res.json(todoModel.getAll());
    }

    static add(req, res) {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Vous avez besoin d'un titre" });
        }

        // ✅ Génération d'un ID aléatoire
        const id = Math.floor(Math.random() * 100);
        const newTodo = todoModel.addTask(title, id);

        res.status(201).json(newTodo);
    }

    static delete(req, res) {
        const id = parseInt(req.params.id);

        const deleted = todoModel.deleteTask(id);
        if (!deleted) {
            return res.status(404).json({ error: "Tâche non trouvée" });
        }

        res.json({ message: "Tâche supprimée avec succès" });
    }
}
