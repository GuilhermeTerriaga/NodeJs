const express = require("express");

const server = express();
server.use(express.json());

const projetos = [{ id: "1", tittle: "Novo projeto", task: [] }];
