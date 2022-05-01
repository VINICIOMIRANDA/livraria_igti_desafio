import LivroService from "../services/livro.service.js";

async function createLivro(req, res, next) {
  try {
    let livro = req.body;

    if (!livro.nome || !livro.valor || !livro.estoque || !livro.autorId) {
      throw new Error(
        "Titulo ,Valor, Estoque e Codigo do Autor  são obrigatórios."
      );
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
    res.send(await LivroService.getLivros(req.query.autorId));
    global.logger.info("GET /livro");
  } catch (err) {
    next(err);
  }
}

async function getLivro(req, res, next) {
  try {
    res.send(await LivroService.getLivro(req.params.id, req.query.autorId));
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
      throw new Error(
        "Titulo ,Valor, Estoque e Codigo do Autor  são obrigatórios"
      );
    }
    livro = await LivroService.updateLivro(livro);
    res.send(livro);
    global.logger.info(`PUT /livro - ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

async function createLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    if (!livroInfo.livroId) {
      throw new Error("livro Id é obrigatório");
    }
    await LivroService.createLivroInfo(livroInfo);
    res.end();
    global.logger.info(`POST /livro/info - ${JSON.stringify(livroInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function updateLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    if (!livroInfo.livroId) {
      throw new Error("livro Id é obrigatorio");
    }
    await LivroService.updateLivroInfo(livroInfo);
    res.end();
    global.logger.info(`PUT /livro/info - ${JSON.stringify(livroInfo)}`);

    // res.send(livroInfo)
  } catch (err) {
    next(err);
  }
}

async function createAvaliacao(req, res, next) {
  try {
    let params = req.body;
    if (!params.livroId || !params.avaliacao) {
      throw new Error("Livro Id e Avaliação são obrigatorios");
    }
    await LivroService.createAvaliacao(params.avaliacao, params.livroId);
    res.end();
    global.logger.info(`POST CREATE Avaliação /livro/avaliação`);
  } catch (err) {
    next(err);
  }
}

async function deleteAvaliacao(req, res, next) {
  try {
    await LivroService.deleteAvaliacao(req.params.id, req.params.index);
    res.end();
    global.logger.info(
      `DELETE Avaliação /livro/${req.params.id}/avaliacao/${req.params.index}`
    );
  } catch (err) {
    next(err);
  }
}
async function getLivrosInfo(req, res, next) {
  try {
    res.send(await LivroService.getLivrosInfo());
    global.logger.info("GET /livro/info ");
  } catch (err) {
    next(err);
  }
}

async function deleteLivroInfo(req, res, next) {
  try {
    res.send(await LivroService.deleteLivrosInfo(req.params.id));
    global.logger.info("DELETE /livro/info ");
  } catch (err) {
    next(err);
  }
}

export default {
  createLivro,
  getLivros,
  getLivro,
  deleteLivro,
  updateLivro,
  createLivroInfo,
  updateLivroInfo,
  createAvaliacao,
  deleteAvaliacao,
  getLivrosInfo,
  deleteLivroInfo,
};
