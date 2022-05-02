import express from "express";
import VendaController from "../controllers/venda.controller.js";

const router = express.Router();

router.post("/", VendaController.InsertVenda);
router.get("/", VendaController.getVendas);
router.get("/:id", VendaController.getVenda);
router.delete("/:id", VendaController.deleteVenda);
router.put("/", VendaController.updateVenda);

export default router;