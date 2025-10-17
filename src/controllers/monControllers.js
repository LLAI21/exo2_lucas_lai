import Todo from "../models/monModel.js";
import db from "../data/mysqlDB.js";

const todoModel = new Todo();

export default class TodoController {
    static async list(req, res) {
        try {
            const tasks = await db.getTasks(); // utilise ta fonction MySQL
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async add(req, res) {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Vous avez besoin d'un titre" });
        }

        try {
            const taskId = await db.addTask(title);
            res.status(201).json({ id: taskId, title });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

        // ✅ Génération d'un ID aléatoire
        // const id = Math.floor(Math.random() * 100);
        // const newTodo = todoModel.addTask(title, id);

        // res.status(201).json(newTodo);
    }

    static async delete(req, res) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID invalide" });
        }

        try {
            await db.deleteTask(id);
            res.json({ message: "Tâche supprimée avec succès" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
