import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export default class UserModel {
  constructor() {
    this.userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      }
    }, { timestamps: true });

    // 🔐 Middleware pour hasher le mot de passe
    this.userSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next();
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
      } catch (err) {
        next(err);
      }
    });

    // 🔍 Méthode pour comparer les mots de passe
    this.userSchema.methods.comparePassword = function (candidatePassword) {
      return bcrypt.compare(candidatePassword, this.password);
    };

    // 📦 Création du modèle
    this.User = mongoose.models.User || mongoose.model('User', this.userSchema);
  }

  // 🔎 Méthode pour récupérer tous les utilisateurs
  async getUsers() {
    return this.User.find();
  }

  // ➕ Méthode pour créer un utilisateur
  async createUser(data) {
    const user = new this.User(data);
    return user.save();
  }

  // 🔍 Méthode pour trouver un utilisateur par email
  async findByEmail(email) {
    return this.User.findOne({ email });
  }
}
