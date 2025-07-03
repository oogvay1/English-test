const jsonServer = require("json-server"); // import json-server library

const server = jsonServer.create(); // create server
const router = jsonServer.router("./data/db.json"); // connect db.json
const middlewares = jsonServer.defaults(); // use default middlewares

const port = process.env.PORT || 8080; // use Render PORT or default to 8080

server.use(middlewares); // apply middlewares
server.use(router); // apply router

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
