import db from "./mysqlDB.js";

export async function MySQL() {
    try {
        await db.initDB();

        const tasks = await db.getTasks();
        console.log("Toutes les tâches :", tasks);


        const tasksAfterDelete = await db.getTasks();
        console.log("Tâches après suppression :", tasksAfterDelete);

    } catch (err) {
        console.error("❌ Erreur dans MySQL() :", err.message);
    }
}

export default MySQL;
