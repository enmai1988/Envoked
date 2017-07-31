'use strict';
const server = require('../service').server;
const PORT = process.env.port || 8080;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
