import basicAuth from "express-basic-auth";
import ClienteRepository from "../repositories/cliente.repository.js";
import VendaRepository from "../repositories/venda.repository.js";

async function createCliente(cliente) {
  return await ClienteRepository.insertCliente(cliente);
}

async function getClientes() {
  return await ClienteRepository.getClientes();
}


async function getCliente(id) {
  return await ClienteRepository.getCliente(id);
}

async function getClienteByEmailSenha(id) {
  return await ClienteRepository.getClienteByEmailSenha(id);
}

async function deleteCliente(id) {
  const vendas = await VendaRepository.getVendasByCliente(id);
  if (vendas.length > 0) {
    throw new Error("Existe vendas para o clientes, não possível excluir");
  }
  await ClienteRepository.deleteCliente(id);
}

async function updateCliente(cliente) {
  return await ClienteRepository.updateCliente(cliente);
}

async function verificaLogin(email, senha){
  const cliente = await ClienteRepository.getClienteByEmail(email);
  if (!cliente){
    return false;
  }
  return basicAuth.safeCompare(cliente.senha, senha);
}

export default {
  createCliente,
  getClientes,
  getCliente,
  deleteCliente,
  updateCliente,
  getClienteByEmailSenha,
  verificaLogin
};
