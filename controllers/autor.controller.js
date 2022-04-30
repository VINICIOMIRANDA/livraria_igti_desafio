import AutorService from "../services/autor.service.js";

async function createAutor(req, res, next) {
  try {
    let autor = req.body;

    if (
      !autor.nome ||
      !autor.email ||
      !autor.telefone 
      
    ) {
      throw new Error("Nome,Email e Telefone  são obrigatórios.");
    }
    autor = await AutorService.createAutor(autor);
    res.send(autor);
    global.logger.info(`POST /autor - ${JSON.stringify(autor)}`);
  } catch (err) {
    next(err);
  }
}

async function getAutores(req, res, next) {
  try {
    res.send(await AutorService.getAutores());
    global.logger.info("GET /autor");
  } catch (err) {
    next(err);
  }
}

async function getAutor(req, res, next) {
  try {
    res.send(await AutorService.getAutor(req.params.id));
    global.logger.info("GET /autor ID");
  } catch (err) {
    next(err);
  }
}


async function deleteAutor(req, res, next) {
  try {
   await AutorService.deleteAutor(req.params.id);
    global.logger.info("DELETE /autor ID");
    res.end();
  } catch (err) {
    next(err);
  }
}

async function updateAutor(req, res, next) {
  try {
    let autor = req.body;

    if (
      !autor.autorId ||
      !autor.nome ||
      !autor.email ||  
      !autor.telefone 
    
    ) {
      throw new Error("Autor ID, Nome,Email e Telefone  são obrigatórios.");
    }
    autor = await AutorService.updateAutor(autor);
    res.send(autor);
    global.logger.info(`PUT /autor - ${JSON.stringify(autor)}`);
  } catch (err) {
    next(err);
  }
}

export default { createAutor, getAutores, getAutor, deleteAutor,updateAutor};