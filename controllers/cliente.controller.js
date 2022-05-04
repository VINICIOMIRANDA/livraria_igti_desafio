import clienteRepository from "../repositories/cliente.repository.js";
import ClienteService from "../services/cliente.service.js";

async function createCliente(req, res, next) {
  try {
    let cliente = req.body;
    let autorizacao = req.auth.user;
    if (autorizacao == "admin") {
      if (
        !cliente.nome ||
        !cliente.email ||
        !cliente.senha ||
        !cliente.telefone ||
        !cliente.endereco
      ) {
        throw new Error(
          "Nome,Email, Senha,Telefone e Endereço  são obrigatórios."
        );
      }
      cliente = await ClienteService.createCliente(cliente);
      res.send(cliente);
      global.logger.info(`POST /cliente - ${JSON.stringify(cliente)}`);
    } else {
      throw new Error(`Usuário ${autorizacao} sem permissão!`);
    }
  } catch (err) {
    next(err);
  }
}

async function getClientes(req, res, next) {
  try {
    let autorizacao = req.auth.user;

    if (autorizacao == "admin") {
      res.send(await ClienteService.getClientes());
      global.logger.info("GET /cliente");
    } else {
      throw new Error(`Usuário ${autorizacao} sem permissão!`);
    }
  } catch (err) {
    next(err);
  }
}

async function getCliente(req, res, next) {
  try {
    let autorizacao = req.auth.user;
    if (autorizacao == "admin") {
      res.send(await ClienteService.getCliente(req.params.id));
      global.logger.info("GET /cliente ID");
    }
  } catch (err) {
    next(err);
  }
}

async function deleteCliente(req, res, next) {
  try {
    let autorizacao = req.auth.user;
    if (autorizacao == "admin") {
      await ClienteService.deleteCliente(req.params.id);
      global.logger.info("DELETE /cliente ID");
      res.end();
    } else {
      throw new Error(
        `Usuário ${autorizacao} sem permissão para executar essa ação!`
      );
    }
  } catch (err) {
    next(err);
  }
}

async function updateCliente(req, res, next) {
  try {
    let autorizacao = req.auth.user;
    const validacaoAuthUserBD = await clienteRepository.getClienteByEmailSenha(
      req.auth.user
    );

    if (autorizacao == "admin") {
      let cliente = req.body;

      if (
        !cliente.clienteId ||
        !cliente.nome ||
        !cliente.email ||
        !cliente.senha ||
        !cliente.telefone ||
        !cliente.endereco
      ) {
        throw new Error(
          "Client ID, Nome,Email, Senha,Telefone e Endereço  são obrigatórios."
        );
      }

      cliente = await ClienteService.updateCliente(cliente);
      res.send(cliente);
      global.logger.info(`PUT /cliente - ${JSON.stringify(cliente)}`);
    }

    if (validacaoAuthUserBD[0].email == req.auth.user) {
      let cliente = req.body;

      if (cliente.clienteId == validacaoAuthUserBD[0].clienteId) {
        if (
          !cliente.nome ||
          !cliente.senha ||
          !cliente.telefone ||
          !cliente.endereco
        ) {
          throw new Error(
            "Client ID, Nome,Email, Senha,Telefone e Endereço  são obrigatórios."
          );
        }

        cliente = await ClienteService.updateCliente(cliente);
        res.send(cliente);
        global.logger.info(`PUT /cliente - ${JSON.stringify(cliente)}`);
      } else {
        throw new Error(
          "O id do cliente não confere com o id no banco, atualização abortadas."
        );
      }
    }
  } catch (err) {
    next(err);
  }
}

async function getClienteByEmailSenha(req, res, next) {
  try {
    console.log("teste console");
    const validacaoAuthUserBD = await ClienteService.getClienteByEmailSenha(
      req.auth.user
    );
    console.log("Validação"+validacaoAuthUserBD[0].email);
    res.send(validacaoAuthUserBD[0].email);
    global.logger.info("GET /cliente ID TESTE");
  } catch (err) {
    next(err);
  }
}

export default {
  createCliente,
  getClientes,
  getCliente,
  deleteCliente,
  updateCliente,
  getClienteByEmailSenha,
};
