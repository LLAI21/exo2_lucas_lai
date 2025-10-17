import db from "./mysqlDB.js";

export async function MySQL() {
    try {
        await db.initDB();

        const taskId = await db.addTask("Apprendre Node.js avec MySQL");

        const tasks = await db.getTasks();
        console.log("Toutes les tâches :", tasks);

        await db.deleteTask(taskId);

        const tasksAfterDelete = await db.getTasks();
        console.log("Tâches après suppression :", tasksAfterDelete);

    } catch (err) {
        console.error("❌ Erreur dans MySQL() :", err.message);
    }
}

export default MySQL;
