import request from "supertest";
import app from "../app.js";
import AutorRepository from "../repositories/autor.repository";
import ClienteRepository from "../repositories/cliente.repository";
import LivroRepository from "../repositories/livro.repository";
import LivroInfoRepository from "../repositories/livroInfo.repository";
import VendaRepository from "../repositories/venda.repository";
import Livro from '../models/livro.model.js'
import db from "../repositories/db.js";
jest.setTimeout(30000);

describe("Teste de integração usuário admin", () => {
  const admin = "admin";
  const passwordAdmin = "desafio-igti-nodejs";

  test("Teste Integração", async () => {
    const autor = {
      nome: "Autor1",
      email: "autor@teste.com",
      telefone: "545555555",
    };

    const livro = {
      nome: "Livro de teste de Integração",
      valor: "35.00",
      estoque: 1,
      autorId : null,

    }

    const cliente = {
      nome:"Usuario de teste ", 
      email: "user@teste.com.br", 
      senha: "senhateste", 
      telefone: "1112222",
      endereco: "Rua dos centro"	

    }

    const DadosCliente = {
      email:cliente.email,
      senha: cliente.senha

    }

    const venda = {
      data: "2022-04-05",
      livroId: null,
      clienteId: null

    }

    let res = await request(app)
      .post("/autor")
      .send(autor)
      .auth(admin, passwordAdmin);
    autor.autorId = res.body.autorId;
    expect(res.body).toMatchObject(autor);
    expect(res.status).toBe(200);

    res = await request(app)
      .get(`/autor/${autor.autorId}`)
      .auth(admin, passwordAdmin);
    expect(res.body).toMatchObject(autor);
    expect(res.body.autorId).toBe(autor.autorId);
    expect(res.body.nome).toBe(autor.nome);
    expect(res.body.telefone).toBe(autor.telefone);
    expect(res.status).toBe(200);

   livro.autorId = autor.autorId;

  res = await request(app).post("/livro").send(livro).auth(admin,passwordAdmin);
    livro.livroId = res.body.livroId;
    expect(res.body).toMatchObject(livro);
    expect(res.status).toBe(200);


    res = await request(app).get(`/livro/${livro.livroId}`).auth(admin,passwordAdmin);
    expect(res.body).toMatchObject(livro);
    expect(res.status).toBe(200);
    expect(res.body.livroId).toBe(livro.livroId);
    expect(res.body.nome).toBe(livro.nome);
    expect(res.body.valor).toBe(livro.valor);
    expect(res.body.estoque).toBe(livro.estoque);
    expect(res.body.autorId).toBe(livro.autorId);


    res = await request(app).post("/cliente").send(cliente).auth(admin,passwordAdmin);
    cliente.clienteId = res.body.clienteId;
    delete cliente.senha
    expect(res.body).toMatchObject(cliente);
    expect(res.status).toBe(200);

    res = await request(app).get(`/cliente/${cliente.clienteId}`).auth(admin,passwordAdmin);
    expect(res.body).toMatchObject(cliente);
    expect(res.status).toBe(200);
    expect(res.body.clienteId).toBe(cliente.clienteId);
    expect(res.body.email).toBe(cliente.email);
    expect(res.body.telefone).toBe(cliente.telefone);
    expect(res.body.endereco).toBe(cliente.endereco);

    

    res = await request(app).get("/livro").auth(DadosCliente.email,DadosCliente.senha);
    const countLivros = await LivroRepository.getLivrosCount();
    expect(res.status).toBe(200);
    expect(countLivros).toBe(1);

    venda.clienteId = cliente.clienteId;
    venda.livroId = livro.livroId
    
    res = await request(app).post('/venda').send(venda).auth(DadosCliente.email,DadosCliente.senha);
    venda.vendaId = res.body.vendaId;
    expect(res.body).toMatchObject(venda);
    expect(res.status).toBe(200);

    res = await request(app).get(`/venda/${venda.vendaId}`).auth(DadosCliente.email,DadosCliente.senha);
    expect(res.body).toMatchObject(venda);
    expect(res.status).toBe(200);
    expect(res.body.vendaId).toBe(venda.vendaId);
    expect(res.body.clienteId).toBe(venda.clienteId);
    expect(res.body.livroId).toBe(venda.livroId);
    expect(res.body.data).toBe(venda.data);

    res = await request(app).delete(`/venda/${venda.vendaId}`).auth(admin,passwordAdmin);
    expect(res.status).toBe(200);
    res = await request(app).delete(`/livro/${livro.livroId}`).auth(admin,passwordAdmin);
    expect(res.status).toBe(200);
    res = await request(app).delete(`/autor/${autor.autorId}`).auth(admin,passwordAdmin);
    expect(res.status).toBe(200);
    res = await request(app).delete(`/cliente/${cliente.clienteId}`).auth(admin,passwordAdmin);
    expect(res.status).toBe(200);

   
  });
});
