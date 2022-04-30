import Cliente from "../models/cliente.model.js";
import Livro from "../models/livro.model.js";
import Venda from "../models/venda.model.js";

async function insertVenda(venda) {
  try {
    return await Venda.create(venda);
  } catch (err) {
    throw err;
  }
}

async function getVendas() {
  try {
    return await Venda.findAll({
      include: [
        {
          model: Livro,
        },
        {
          model: Cliente,
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function getVenda(id) {
  try {
    return await Venda.findByPk(id, { raw: true });
  } catch (err) {
    throw err;
  }
}

/*async function updateVenda(venda) {
  try {
    await Venda.update(venda, {
      where: {
        vendaId: venda.vendaId,
      },
    });
    return await getVenda(venda.vendaId);
  } catch (err) {
    throw err;
  }
}*/

async function updateVenda(venda) {
  try {
    await Venda.update(
      {
        valor: venda.valor,
        data: venda.data,
        clienteId: venda.clienteId,
        livroId: venda.livroId,
      },
      {
        where: {
          vendaId: venda.vendaId,
        },
      }
    );
    return await getVenda(venda.vendaId);
  } catch (err) {
    throw err;
  }
}

async function deleteVenda(id) {
  try {
    await Venda.destroy({
      where: {
        vendaId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  insertVenda,
  getVenda,
  getVendas,
  updateVenda,
  deleteVenda,
};
