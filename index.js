import express from "express";
import cors from "cors";
import winston from "winston";
import clientesRouter from "./routes/cliente.route.js";
import autoresRouter from "./routes/autor.route.js";
import livrosRouter from "./routes/livro.route.js"
import vendasRouter from "./routes/venda.route.js";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message} `;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "store-api.log" }),
  ],
  format: combine(label({ label: "store-api" }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use("/cliente", clientesRouter);
app.use("/autor", autoresRouter);
app.use("/livro", livrosRouter);
app.use("/venda", vendasRouter);

app.use((err, req, res,next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
})

app.listen(3000, () => console.log("Api Started!"));