# exo2_lucas_lai

# 📋 Task Manager API
A simple RESTful API for managing tasks (Todo list), built with Node.js, Express, and MySQL.

🚀 Features
🔍 List all tasks

➕ Add a new task

🗑 Delete a task

🔐 Secure database connection using .env file

🧱 Project Structure
Code
project/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── monControllers.js
│   │
│   ├── data/
│   │   ├── mysqlDB.js
│   │   └── verifSQL.js
│   │
│   ├── models/
│   │   └── monModel.js
│   │
│   ├── routes/
│   │   └── mesRoutes.js
│
├── .env
├── .gitignore
├── mysql.json
├── package.json
├── package-lock.json
├── README.md
├── server.js

# ⚙️ Installation
Clone the project:

bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
Install dependencies:

bash
npm install
Create a .env file:

Code
DB_PASSWORD=yourMySQLPassword
Configure mySQL.json:

json
{
  "host": "127.0.0.1",
  "port": 3306,
  "user": "root",
  "database": "task_manager"
}
Create the MySQL table:

sql
CREATE TABLE tasks (
  id INT PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);
Start the server:

bash
node app.js
# 📡 API Endpoints
Method	Route	Description
GET	/tasks	Retrieve all tasks
POST	/tasks	Add a new task ({ title })
DELETE	/tasks/:id	Delete a task by ID
# 🧪 Example POST Request
http
POST /tasks
Content-Type: application/json

{
  "title": "Buy groceries"
}
# 🛠 Technologies Used
Node.js

Express

MySQL

dotenv

mysql2