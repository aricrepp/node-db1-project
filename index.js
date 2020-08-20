const express = require('express');
const accountRouter = require('./data/seeds/accountsRouter');
const server = require('./api/server.js');

const PORT = process.env.PORT || 5000;

server.use(express.json());
server.use('/', accountRouter);

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
