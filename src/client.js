const net = require('net');
const os = require('os');
const { EventEmitter } = require('events');
const { FSM } = require('tiny-application-layer-protocol');
const { port, path } = require('./config');

class Client extends EventEmitter {
  constructor(options) {
    super();
    this.options = this.formatOptions(options);
    const socket = net.connect(this.options);
    socket.on('error', (error) => {
      console.error(error);
    });
    socket.send = socket.write;
    const fsm = new FSM({
      cb: (packet) => {
        socket.emit('message', packet);
      }
    });
    socket.on('data', fsm.run.bind(fsm));
    return socket; 
  }
  formatOptions(_options) {
    const options = { ..._options };
    if (os.platform() === 'win32' || options.isRPC) {
      !~~options.port && (options.port = options.isRPC ? 80 : port);
      delete options.path;
    } else {
      !options.path && (options.path = path); 
      delete options.host;
      delete options.port;
    }
    return options; 
  }
}
module.exports = {
    Client,
};
