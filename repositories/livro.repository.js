import Autor from "../models/autor.model.js";
import Livro from "../models/livro.model.js";

async function insertLivro(livro) {
  try {
    return await Livro.create(livro);
  } catch (err) {
    throw err;
  }
}

async function getLivros() {
  try {
    return await Livro.findAll();
  } catch (err) {
    throw err;
  }
}

async function getLivro(id) {
  try {
    return await Livro.findByPk(id, { raw: true });
  } catch (err) {
    throw err;
  }
}

async function getLivrosByAutor(autorId) {
  try {
    return await Livro.findAll({
      where: {
        autorId,
      },
      include: [
        {
          model: Autor,
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}


async function getLivrosCount(){
  try {
    return await Livro.count();
  } catch (err) {
    throw err;
  }
}



async function updateLivro(livro) {
  try {
    await Livro.update(
      {
        valor: livro.valor,
        estoque: livro.estoque,
      },
      {
        where: {
          livroId: livro.livroId,
        },
      }
    );
    return await getLivro(livro.livroId);
  } catch (err) {
    throw err;
  }
}

async function deleteLivro(id) {
  try {
    await Livro.destroy({
      where: {
        livroId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  insertLivro,
  getLivro,
  getLivros,
  updateLivro,
  deleteLivro,
  getLivrosByAutor,getLivrosCount
};
