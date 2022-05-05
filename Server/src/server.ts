import express from "express";
import { routes } from "./routes";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json())
server.use(routes)

// GET, POST , PUT, PATCH, DELETE

// GET = Buscar informações
// POST = Cadastrar informações
// PUT = Atualizar informações de uma entidade
// PATCH = Atualizar informações única de uma entidade
// DELETE = Deletar uma informação






server.listen(8080, () => console.log("HTTP server running"))