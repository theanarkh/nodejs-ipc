const {
    IPCServer,
    IPCClient,
} = require('./ipc');
const { 
    RPCServer,
    RPCClient,
 } = require('./rpc');
const RequestManager = require('./lib/RequestManager');

module.exports = {
    IPCServer,
    IPCClient,
    RPCServer,
    RPCClient,
    RequestManager,
    ...require('tiny-application-layer-protocol')
}