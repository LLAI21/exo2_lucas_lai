import mysql from "mysql2/promise";
import { readFileSync } from "fs";
import dotenv from 'dotenv';

//Appeler dotenv
dotenv.config();

// Charger la configuration
const config = JSON.parse(readFileSync("./mysql.json", "utf8"));

//Ajout de mot de passe de puis .env
// config.password = process.env.DB_PASSWORD;

const db = {
  // Créer une connexion
  getConnection: async function() {
    const connection = await mysql.createConnection(config);
    return connection;
  },

  // Initialiser la table
  initDB: async function() {
    const conn = await this.getConnection();
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      )
    `);
    await conn.end();
    console.log("✅ Base et table initialisées !");
  },

  // Ajouter une tâche
  addTask: async function(title) {
    const conn = await this.getConnection();
    const [result] = await conn.execute(
      "INSERT INTO tasks (title) VALUES (?)",
      [title]
    );
    await conn.end();
    console.log("Tâche ajoutée avec l'ID :", result.insertId);
    return result.insertId;
  },

  // Supprimer une tâche par ID
  deleteTask: async function(id) {
    const conn = await this.getConnection();
    const [result] = await conn.execute(
      "DELETE FROM tasks WHERE id = ?",
      [id]
    );
    await conn.end();
    if (result.affectedRows === 0) {
      console.log(`⚠️  Aucune tâche trouvée avec l'ID ${id}`);
    } else {
      console.log(`✅ Tâche avec l'ID ${id} supprimée`);
    }
  },

  // Lister toutes les tâches
  getTasks: async function() {
    const conn = await this.getConnection();
    const [rows] = await conn.execute("SELECT * FROM tasks");
    await conn.end();
    return rows;
  }
};

export default db;
