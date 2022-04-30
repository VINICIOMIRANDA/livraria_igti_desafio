import AutorRepository from "../repositories/autor.repository.js";
import LivroRepository from "../repositories/livro.repository.js";

async function createLivro(livro) {
  if (await AutorRepository.getAutor(livro.autorId)) {
    return await LivroRepository.insertLivro(livro);
  }
  throw new Error("O autor_id informado não existe");
}

async function getLivros(autorId) {
  if (autorId) {
    return await LivroRepository.getLivrosByAutor(autorId);
  }
  return await LivroRepository.getLivros();
}

async function getLivro(id) {
  const livro = await LivroRepository.getLivro(id);
  return livro;
}

async function deleteLivro(id){
    await LivroRepository.deleteLivro(id);
}

async function updateLivro(livro){
    return await LivroRepository.updateLivro(livro)
}

export default {
  createLivro,
  getLivro,
  getLivros,
  deleteLivro,
  updateLivro
};
