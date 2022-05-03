import request from "supertest";
import app from "../app.js"
import AutorRepository from "../repositories/autor.repository";
import ClienteRepository from "../repositories/cliente.repository";
import LivroRepository from "../repositories/livro.repository";
import LivroInfoRepository from "../repositories/livroInfo.repository";
import VendaRepository from "../repositories/venda.repository";


jest.setTimeout(30000);



test("Cenario 01", async () => {

  const autor = {
    nome: "Autor1",
    email: "autor@teste.com",
    telefone: "545555555"
  }

  const admin = "admin";
  const passwordAdmin = "desafio-igti-nodejs";
  
  let res = await request(app).post("/autor").send(autor).auth(admin, passwordAdmin);
  autor.autorId = res.body.autorId;
  expect(res.body).toMatchObject(autor);
  expect(res.status).toBe(200);


})