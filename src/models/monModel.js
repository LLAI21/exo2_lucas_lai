export default class Todo {
    constructor() {
        this.todos = []; // Tableau pour stocker les tâches
    }

    // 🔍 Récupérer toutes les tâches
    getAll() {
        return this.todos;
    }

    // ➕ Ajouter une nouvelle tâche
    addTask(title, id) {
        const newTask = { id, title };
        this.todos.push(newTask);
        return newTask;
    }

    // ❌ Supprimer une tâche par ID
    deleteTask(id) {
        const index = this.todos.findIndex(task => task.id === id);
        if (index === -1) return false;

        this.todos.splice(index, 1);
        return true;
    }
}
