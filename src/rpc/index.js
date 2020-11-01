const { Server } = require('./server');
const { Client } = require('./client');
module.exports = {
    RPCServer: Server, RPCClient: Client,
};