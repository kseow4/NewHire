// server.js
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Use your route rewrites
server.use(jsonServer.rewriter({
  "/api/v1/*": "/$1",
  "/WorkLog/:id/show": "/WorkLog/:id"
}));

server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
