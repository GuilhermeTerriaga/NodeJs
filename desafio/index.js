const { query } = require("express");
const express = require("express");

const server = express();
server.use(express.json());

const projects = [];

function checkIdExists(req, res, next) {
	const { id } = req.params;
	const project = projects.find((p) => p.id == id);

	if (!project) {
		return res.status(400).json({ error: "project not found :(" });
	}
	return next();
}

server.get("/projects", (req, res) => {
	return res.json(projects);
});

function logRequest(req, res, next) {
	console.count("Request number");

	return next();
}

server.use(logRequest);

server.post("/projects", (req, res) => {
	const { id, title } = req.body;

	const project = {
		id,
		title,
		tasks: [],
	};

	projects.push(project);

	return res.json(project);
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
	const { id } = req.params;
	const { title } = req.body;

	const project = projects.find((p) => p.id == id);

	project.tasks.push(title);

	return res.json(project);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
	const { id } = req.params;
	const { title } = req.body;

	const project = projects.find((p) => p.id == id);
	project.title = title;

	return res.json(projects);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
	const { id } = req.params;

	const projectId = projects.findIndex((p) => p.id == id);

	projects.splice(projectId, 1);

	return res.send(418);
});

server.listen(3000);
