const net = require('net');
const { EventEmitter } = require('events');
const { FSM } = require('tiny-application-layer-protocol');
const { path } = require('../config');
class Client extends EventEmitter {
  constructor(options) {
    super();
    this.options = { ...options };
    const socket = net.connect(this.options);
    socket.on('error', (error) => {
      console.error(error);
    });
    const fsm = new FSM({
      cb: (packet) => {
        socket.emit('message', packet);
      }
    });
    socket.on('data', fsm.run.bind(fsm));
    return socket; 
  }
}
module.exports = {
    Client,
};