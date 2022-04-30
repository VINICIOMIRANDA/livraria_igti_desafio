import LivroService from "../services/livro.service.js";

async function createLivro(req, res, next) {
  try {
    let livro = req.body;

    if (
      !livro.nome ||
      !livro.valor ||
      !livro.estoque ||
      !livro.autorId
      
    ) {
      throw new Error("Titulo ,Valor, Estoque e Codigo do Autor  são obrigatórios.");
    }
    livro = await LivroService.createLivro(livro);
    res.send(livro);
    global.logger.info(`POST /livro - ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

async function getLivros(req, res, next) {
  try {
    res.send(await LivroService.getLivros());
    global.logger.info("GET /livro");
  } catch (err) {
    next(err);
  }
}

async function getLivro(req, res, next) {
  try {
    res.send(await LivroService.getLivro(req.params.id));
    global.logger.info("GET /livro ID");
  } catch (err) {
    next(err);
  }
}


async function deleteLivro(req, res, next) {
  try {
   await LivroService.deleteLivro(req.params.id);
    global.logger.info("DELETE /livro ID");
    res.end();
  } catch (err) {
    next(err);
  }
}

async function updateLivro(req, res, next) {
  try {
    let livro = req.body;

    if (
      !livro.livroId ||
      !livro.nome ||
      !livro.valor ||
      !livro.estoque ||
      !livro.autorId
    
    ) {
      throw new Error("Titulo ,Valor, Estoque e Codigo do Autor  são obrigatórios");
    }
    livro = await LivroService.updateLivro(livro);
    res.send(livro);
    global.logger.info(`PUT /livro - ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

export default { createLivro, getLivros, getLivro, deleteLivro,updateLivro};