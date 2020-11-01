const { Server } = require('./server');
const { Client } = require('./client');
module.exports = {
    IPCServer: Server, IPCClient: Client,
};