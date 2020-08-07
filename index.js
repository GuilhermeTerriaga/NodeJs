const express = require("express");

const server = express();
const users = ["usuarioA", "usuarioB", "usuarioC", "usuarioD"];

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

server.post("/users", (req, res) => {});

server.listen(3000);

// Query params = ?teste=1 implementa:
//  server.get('/users/', (req, res) =>{
//  const [nomeVarRecebida] = req.query.[nomeVarRecebida];
//  return res.json({`qualquer coisa: ${[nomeVarRecebida]}`});
//   });
//
// Route params = /users/1 implementa:
//  server.get('/users/:[nomeVarRecebida]', (req, res) => {
//  const {[nomeVarRecebida]} = req.params;
//  return res.json({`qualquer coisa: ${[nomeVarRecebida]}`});
//  });
//
// ou com um Array
//  const users = ['usuarioA', 'usuarioB', 'usuarioC'];
//  server.get('/users/:index', (req, res) => {
//  const {index} = req.params;
//  return res.json(users[index]);
//  });
//
// Request params = {"name": "Gulherme", "emai": "123@123.com"} implementa:
