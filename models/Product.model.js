const mongoose = require("mongoose");

// Definição de schema (regras dos campos do documento)
const ProductSchema = new mongoose.Schema({
  // o campo _id é gerado automaticamente pelo MongoDB e NÃO precisa ser definido no Schema
  name: String,
  price: Number,
  qttInStock: Number,
});

// Criação do modelo
// O nome do modelo (primeiro argumento) é o que determina o nome da coleção no MongoDB, porém no plural. Nesse caso, nossa coleção será chamada de 'products'
module.exports = mongoose.model("Product", ProductSchema);
