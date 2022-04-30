import express from "express";
import VendaController from "../controllers/venda.controller.js";

const router = express.Router();

router.post("/", VendaController.InsertVenda);
router.put("/", VendaController.updateVenda);
router.get("/", VendaController.getVendas);
router.get("/:id", VendaController.getVenda);
router.delete("/:id", VendaController.deleteVenda);


export default router;