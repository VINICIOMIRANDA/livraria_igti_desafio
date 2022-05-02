import express from "express";
import cors from "cors";
import winston from "winston";
import clientesRouter from "./routes/cliente.route.js";
import autoresRouter from "./routes/autor.route.js";
import livrosRouter from "./routes/livro.route.js";
import vendasRouter from "./routes/venda.route.js";
import basicAuth from "express-basic-auth";

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



function getRole(username) {
  if (username == "admin") {
    return "admin";
  } else if (username == "vinicio.covalski@gmail.com" || "user@user.com.br") {
    return "role1";
  }
}

function authorize(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    if ((req, res, next)) {
      const role = getRole(req.auth.user);

      if (isAllowed(role)) {
        next();
      } else {
        res.status(401).send("Role not allowed");
      }
    } else {
      res.status(403).send("User not found");
    }
  };
}



app.use(
  basicAuth({
    authorizer: (username, password) => {
      const userMatches = basicAuth.safeCompare(username, "admin");
      const passwdMatches = basicAuth.safeCompare(
        password,
        "teste"
      );

      const userMatches2 = basicAuth.safeCompare(username, "vinicio.covalski@gmail.com");
      const passwdMatches2 = basicAuth.safeCompare(
        password,
        "teste"
      );

      const userMatches3 = basicAuth.safeCompare(username, "user@user.com.br");
      const passwdMatches3 = basicAuth.safeCompare(
        password,
        "teste"
      );


      return (userMatches && passwdMatches) || (userMatches2 && passwdMatches2) || (userMatches3 && passwdMatches3);
    },
  })
);

app.use("/cliente", authorize("admin", "role1"), clientesRouter);
app.use("/autor", authorize("admin"), autoresRouter);
app.use("/livro", authorize("admin", "role1"), livrosRouter);
app.use("/venda", authorize("admin", "role1"), vendasRouter);

app.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

app.listen(3000, () => console.log("Api Started!"));
