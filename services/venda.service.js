import ClienteRepository from "../repositories/cliente.repository.js";
import LivroRepository from "../repositories/livro.repository.js";
import VendaRepository from "../repositories/venda.repository.js";

async function getVendas(clienteId) {
  if (clienteId) {
    return await VendaRepository.getVendasByCliente(clienteId);
  }
  return await VendaRepository.getVendas();
}

async function getVenda(id) {
  return await VendaRepository.getVenda(id);
}

async function deleteVenda(id) {
  await VendaRepository.deleteVenda(id);
}

async function insertVenda(venda) {
  let error = "";
  if (!(await ClienteRepository.getCliente(venda.clienteId))) {
    error = "O cliente_id informado não existe.";
  }

  const livro = await LivroRepository.getLivro(venda.livroId);

  if (!livro) {
    error += " O livro_id informado não existe.";
  }
  if (error) {
    throw new Error(error);
  }

  if (livro.estoque > 0) {
    venda = await VendaRepository.insertVenda(venda);
    livro.estoque--;
    await LivroRepository.updateLivro(livro);
    return venda;
  } else {
    throw new Error("O livro informado não possui estoque");
  }
}

async function updateVenda(venda){
    let error = "";
    if (!(await ClienteRepository.getCliente(venda.clienteId))) {
      error = "O cliente_id informado não existe.";
    }
    if (!(await LivroRepository.getLivro(venda.livroId))) {
      error += " O livro_id informado não existe.";
    }
    if (error) {
      throw new Error(error);
    }
    return await VendaRepository.updateVenda(venda);
}

export default {
  getVenda,
  getVendas,
  deleteVenda,
  insertVenda,
  updateVenda
};
