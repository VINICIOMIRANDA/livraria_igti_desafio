import AutorRepository from "../repositories/autor.repository.js";
import LivroRepository from "../repositories/livro.repository.js";
import LivroInfoRepository from "../repositories/livroInfo.repository.js";

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
  livro.info = await livroInfoRepository.getLivrosInfo(parseInt(id));

  return livro;
}

async function deleteLivro(id) {
  await LivroRepository.deleteLivro(id);
}

async function updateLivro(livro) {
  return await LivroRepository.updateLivro(livro);
}

async function createLivroInfo(livroInfo) {
  await LivroInfoRepository.createLivroInfo(livroInfo);
}

async function updateLivroInfo(livroInfo) {
  await LivroInfoRepository.updateLivroInfo(livroInfo);
}

async function getLivrosInfo() {
  return await LivroInfoRepository.getLivrosInfo();
}

async function deleteLivrosInfo(livroInfo) {
  await LivroInfoRepository.deleteLivroInfo(parseInt(livroInfo));
}

async function createAvaliacao(avaliacao, livroId) {
  await LivroInfoRepository.createAvaliacao(avaliacao, livroId);
}

async function deleteAvaliacao(livroId, index) {
  await LivroInfoRepository.deleteAvaliacao(parseInt(livroId), index);
}

export default {
  createLivro,
  getLivro,
  getLivros,
  deleteLivro,
  getLivrosInfo,
  updateLivro,
  createLivroInfo,
  updateLivroInfo,
  deleteLivrosInfo,
  deleteAvaliacao,
  createAvaliacao,
};
