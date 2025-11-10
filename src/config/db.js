import mongoose from "mongoose";
// import { Client } from 'pg'

////Url localhost mongo
const MONGO_URI = process.env.MONGO_URI; 
// //Url de la base de donnée dans postgres
// const client = new Client({
//   connectionString: process.env.POSTGRES_URI || 'postgres://postgres:password@localhost:5432/postgres'
// });

const connectDB = async () => { //Connexion avec les db
  //Partie mongo
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connexion à MongoDB réussie');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB :', error.message);
    process.exit(1);
  }


  


  // //Partie postgres
  // try {
  //   await client.connect();
  //   console.log('✅ Connexion PostgreSQL réussie');
  // } catch (err) {
  //   console.error('❌ Erreur PostgreSQL :', err.message);
  // } finally {
  //   await client.end();
  //   console.log('🔌 Connexion PostgreSQL fermée');
  // }
};


// ✅ Export par défaut
export default connectDB;

// ✅ Export nommé (optionnel)
export { connectDB, mongoose };
