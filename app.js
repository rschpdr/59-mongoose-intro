const mongoose = require("mongoose");
const ProductModel = require("./models/Product.model");

const productsArr = require("./products");

// Conectar com o MongoDB

const DB_NAME = `super-loja`;

mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (connObj) => {
    console.log(
      `Conectado ao banco ${connObj.connections[0].name} com sucesso!`
    );

    try {
      // Interagindo com o banco (fazendo o CRUD)

      // ATENÇÃO: a linha abaixo DELETA o banco inteiro. NÃO USE em projetos ou labs. Só estamos implementando isso nesse exemplo porque ainda não estamos usando o Express.
      await connObj.connections[0].dropDatabase();

      // Criar um documento

      const createdProduct = await ProductModel.create({
        name: "Apple Iphone 13",
        price: 13500,
        qttInStock: 18,
      });

      // Criar vários documentos ao mesmo tempo
      await ProductModel.insertMany(productsArr);

      // Consultar todos os documentos

      const allProducts = await ProductModel.find();

      console.log("TODOS OS PRODUTOS => ", allProducts);

      // Consultar documento específico

      const oneProduct = await ProductModel.findOne({
        _id: createdProduct._id,
      });

      console.log("UM PRODUTO ESPECíFICO => ", oneProduct);

      // Editar um documento

      const updatedProduct = await ProductModel.findOneAndUpdate(
        { name: "Redmi 10" },
        { $set: { price: 5000 } }, // O operador $set sempre vai receber um objeto contendo os campos que devem atualizados e os novos valores desses campos. CUIDADO pois o $set substitui os valores.

        // Este terceiro argumento é um objeto de configuração e a chave new configura o método para retornar o objeto atualizado ao invés do objeto antigo
        { new: true }
      );

      console.log("PRODUTO ATUALIZADO => ", updatedProduct);

      // Deletar um documento

      const deletedProduct = await ProductModel.deleteOne({
        name: "Apple Iphone 13",
      });

      console.log("PRODUTO DELETADO => ", deletedProduct);
    } catch (err) {
      console.log(err);
    }
  })
  .catch((err) => {
    console.log("Erro de conexão com o banco");
    console.log(err);
  });
