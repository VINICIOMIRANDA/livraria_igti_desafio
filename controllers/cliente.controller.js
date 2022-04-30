import ClienteService from "../services/cliente.service.js";

async function createCliente(req, res, next) {
  try {
    let cliente = req.body;

    if (
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error("Nome,Email, Senha,Telefone e Endereço  são obrigatórios.");
    }
    cliente = await ClienteService.createCliente(cliente);
    res.send(cliente);
    global.logger.info(`POST /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

async function getClientes(req, res, next) {
  try {
    res.send(await ClienteService.getClientes());
    global.logger.info("GET /cliente");
  } catch (err) {
    next(err);
  }
}

async function getCliente(req, res, next) {
  try {
    res.send(await ClienteService.getCliente(req.params.id));
    global.logger.info("GET /cliente ID");
  } catch (err) {
    next(err);
  }
}


async function deleteCliente(req, res, next) {
  try {
   await ClienteService.deleteCliente(req.params.id);
    global.logger.info("DELETE /cliente ID");
    res.end();
  } catch (err) {
    next(err);
  }
}

async function updateCliente(req, res, next) {
  try {
    let cliente = req.body;

    if (
      !cliente.clienteId ||
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error("Client ID, Nome,Email, Senha,Telefone e Endereço  são obrigatórios.");
    }
    cliente = await ClienteService.updateCliente(cliente);
    res.send(cliente);
    global.logger.info(`PUT /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

export default { createCliente, getClientes, getCliente, deleteCliente,updateCliente};