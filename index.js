const express = require("express");

const server = express();
server.use(express.json());

const users = ["usuarioA", "usuarioB", "usuarioC", "usuarioD"];
//global middleware
server.use((req, res, next) => {
  console.time("request");
  console.log(`Method: ${req.method}; URL: ${req.url}`);

  next();
  console.timeEnd("request");
});

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }
  req.user = user;
  return next();
}

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ error: "User name not found on request body" });
  }
  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;
  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
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
