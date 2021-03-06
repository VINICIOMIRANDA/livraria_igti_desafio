import Cliente from "../models/cliente.model.js";
import Livro from "../models/livro.model.js";
import Venda from "../models/venda.model.js";
import LivroRepository from "./livro.repository.js";

async function insertVenda(venda) {
  try {
    const valorVenda = await LivroRepository.getLivro(venda.livroId);
    return await Venda.create({
      valor: valorVenda.valor,
      data: venda.data,
      clienteId: venda.clienteId,
      livroId: venda.livroId,
    });
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
          attributes: ["clienteId", "nome", "email", "telefone", "endereco"],
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

async function getVendasByCliente(clienteId) {
  try {
    return await Venda.findAll({
      where: {
        //   productId : productId
        clienteId,
      },
      include: [
        {
          model: Cliente,
          attributes: ["clienteId", "nome", "email", "telefone", "endereco"],
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function getVendasByLivro(livroId) {
  try {
    return await Venda.findAll({
      where: {
        //   productId : productId
        livroId,
      },
      include: [
        {
          model: Livro,
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function getVendasByAutor(autorId) {
  try {
    return await Venda.findAll({
      include: [
        {
          model: Livro,
          where: {
            autorId,
          },
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

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
  getVendasByCliente,
  getVendasByLivro,
  getVendasByAutor,
};
