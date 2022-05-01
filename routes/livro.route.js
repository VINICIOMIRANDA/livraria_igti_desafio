import express from "express";
import LivroController from "../controllers/livro.controller.js";

const router = express.Router();

router.get("/", LivroController.getLivros);
router.post("/", LivroController.createLivro);
router.put("/", LivroController.updateLivro);
router.get("/info", LivroController.getLivrosInfo);
router.post("/info", LivroController.createLivroInfo);
router.put("/info", LivroController.updateLivroInfo);
router.post("/avaliacao", LivroController.createAvaliacao);
router.get("/:id", LivroController.getLivro);
router.delete("/:id", LivroController.deleteLivro);
router.delete("/:id/avaliacao/:index", LivroController.deleteAvaliacao);
router.delete("/info/:id", LivroController.deleteLivroInfo);

export default router;
