import VendaService from "../services/venda.service.js";

async function InsertVenda(req, res, next) {
  try {
    let venda = req.body;

    if (!venda.valor || !venda.data || !venda.clienteId || !venda.livroId) {
      throw new Error(
        "Data, codigo do cliente, codigo do livro e valores são obrigatórios."
      );
    }
    venda = await VendaService.insertVenda(venda);
    res.send(venda);
    global.logger.info(`POST /venda - ${JSON.stringify(venda)}`);
  } catch (err) {
    next(err);
  }
}

async function getVendas(req, res, next) {
  try {
    res.send(
      await VendaService.getVendas(req.query.clienteId, req.query.livroId)
    );
    global.logger.info("GET /venda");
  } catch (err) {
    next(err);
  }
}

async function getVenda(req, res, next) {
  try {
    res.send(await VendaService.getVenda(req.params.id));
    global.logger.info("GET /venda ID");
  } catch (err) {
    next(err);
  }
}

async function deleteVenda(req, res, next) {
  try {
    await VendaService.deleteVenda(req.params.id);
    global.logger.info("DELETE /venda ID");
    res.end();
  } catch (err) {
    next(err);
  }
}

async function updateVenda(req, res, next) {
  try {
    let venda = req.body;

    if (
      !venda.vendaId ||
      !venda.valor ||
      !venda.data ||
      !venda.clienteId ||
      !venda.livroId
    ) {
      throw new Error(
        "Codigo Venda, Data, codigo do cliente, codigo do livro e valores são obrigatórios."
      );
    }
    venda = await VendaService.updateVenda(venda);
    res.send(venda);
    global.logger.info(`PUT /venda - ${JSON.stringify(venda)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  InsertVenda,
  getVendas,
  getVenda,
  deleteVenda,
  updateVenda,
};
