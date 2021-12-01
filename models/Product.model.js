const mongoose = require("mongoose");

// Definição de schema (regras dos campos do documento)
const ProductSchema = new mongoose.Schema({
  // o campo _id é gerado automaticamente pelo MongoDB e NÃO precisa ser definido no Schema
  name: { type: String, required: true, unique: true, maxlength: 50 },
  price: Number,
  qttInStock: { type: Number, min: 0 },
  image: {
    type: String,
    default: "http://www.plasson.com.br/livestock/images/image-not-found.jpg",
  },
  category: {
    type: String,
    enum: ["Celular/Smartphone", "Computador/Notebook", "Acessórios"],
  },
  password: {
    type: String,
    match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm,
  },
}); // Somente os campos definidos no objeto de Schema (name, price, qttInStock) serão inseridos no banco. Qualquer outro campo será ignorado.

// Criação do modelo
// O nome do modelo (primeiro argumento) é o que determina o nome da coleção no MongoDB, porém no plural. Nesse caso, nossa coleção será chamada de 'products'
module.exports = mongoose.model("Product", ProductSchema);
