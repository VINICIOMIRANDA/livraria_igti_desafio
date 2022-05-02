import clienteService from "../services/cliente.service.js";
import VendaService from "../services/venda.service.js";

async function InsertVenda(req, res, next) {
  try {
    let autorizacao = req.auth.user;
    if (autorizacao == "admin") {
      let venda = req.body;

      if (!venda.data || !venda.clienteId || !venda.livroId) {
        throw new Error(
          "Data, codigo do cliente, codigo do livro e valores são obrigatórios."
        );
      }
      venda = await VendaService.insertVenda(venda);
      res.send(venda);
      global.logger.info(`POST /venda - ${JSON.stringify(venda)}`);
    }

    const validacaoAuthUserBD = await clienteService.getClienteByEmailSenha(
      req.auth.user
    );
    if (validacaoAuthUserBD[0].email == req.auth.user) {
      let venda = req.body;
      if (venda.clienteId == validacaoAuthUserBD[0].clienteId) {
        if (!venda.data || !venda.clienteId || !venda.livroId) {
          throw new Error(
            "Data, codigo do cliente, codigo do livro e valores são obrigatórios."
          );
        }
        venda = await VendaService.insertVenda(venda);
        res.send(venda);
        global.logger.info(`POST /venda - ${JSON.stringify(venda)}`);
      } else {
        throw new Error(
          "Erro seus dados não conferem favor verificar se os dados de sua conta estão ok."
        );
      }
    }
  } catch (err) {
    next(err);
  }
}

async function getVendas(req, res, next) {
  try {
    let autorizacao = req.auth.user;
    const validacaoAuthUserBD = await clienteService.getClienteByEmailSenha(
      autorizacao
    );

    if (autorizacao == "admin") {
      res.send(
        await VendaService.getVendas(
          req.query.clienteId,
          req.query.livroId,
          req.query.autorId
        )
      );
      global.logger.info("GET /venda");
    }

    if (validacaoAuthUserBD[0].email == autorizacao) {
      let clienteId = validacaoAuthUserBD[0].clienteId;
      res.send(await VendaService.getVendas(clienteId));
    } else {
      throw new Error(`Usuário ${autorizacao} sem permissão!`);
    }
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
    let autorizacao = req.auth.user;
    if (autorizacao == "admin") {
      await VendaService.deleteVenda(req.params.id);
      global.logger.info("DELETE /venda ID");
      res.end();
    } else {
      throw new Error(`Usuário ${autorizacao} sem permissão!`);
    }
  } catch (err) {
    next(err);
  }
}

async function updateVenda(req, res, next) {
  try {
    let autorizacao = req.auth.user;
    if (autorizacao == "admin") {
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
    } else {
      throw new Error(`Usuário ${autorizacao} sem permissão!`);
    }
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
