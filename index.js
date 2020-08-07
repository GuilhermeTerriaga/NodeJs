const express = require("express");

const server = express();
server.use(express.json());

const users = ["usuarioA", "usuarioB", "usuarioC", "usuarioD"];

server.use((req, res, next) => {
  console.log(`Method: ${req.method}; URL: ${req.url}`);
  return next();
});

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

server.post("/users", (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;
  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.send();
});

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
//   server.post("/users", (req, res) => {
//   const { name } = req.body;
//   users.push(name);
//   return res.json(users);
//   });
