import express from "express";
import LivroController from "../controllers/livro.controller.js";

const router = express.Router();

router.get("/", LivroController.getLivros);
router.post("/", LivroController.createLivro);
router.put("/", LivroController.updateLivro);
router.get("/:id", LivroController.getLivro);
router.delete("/:id", LivroController.deleteLivro);

export default router;
