import AutorRepository from "../repositories/autor.repository.js";
import LivroRepository from "../repositories/livro.repository.js";


async function createAutor(autor) {
  return await AutorRepository.insertAutor(autor);
}

async function getAutores() {
return await AutorRepository.getAutores();
}

async function getAutor(id) {
  return await AutorRepository.getAutor(id);
}

async function deleteAutor(id) {
  const livros = await LivroRepository.getLivrosByAutor(id);
  if (livros.length > 0){
    throw new Error ("Existe livros cadastrados para esse Autor, não possível excluir");
  }
   await AutorRepository.deleteAutor(id);
}

async function updateAutor(autor) {
  return await AutorRepository.updateAutor(autor);
}

export default {
  createAutor,getAutores,getAutor,deleteAutor,updateAutor
};