const fs = require('fs');
const net = require('net');
const { EventEmitter } = require('events')
const { FSM } = require('tiny-application-layer-protocol');

class Server extends EventEmitter {
    constructor(options, connectionListener) {
      super();
      if (typeof options === 'function') {
        options = {
          connectionListener: options,
        };
      } else {
        options = { ...options, connectionListener };
      }
      this.options = { ...options };
      return net.createServer({allowHalfOpen: this.options.allowHalfOpen, pauseOnConnect: this.options.pauseOnConnect}, (client) => {
        const fsm = new FSM({
            cb: function(packet) {
              client.emit('message', packet);
            }
        })
        client.on('data', fsm.run.bind(fsm));
        client.on('error', (error) => {
          console.error(error);
        });
        typeof this.options.connectionListener === 'function' && this.options.connectionListener(client);
      }).listen(this.options);
    }
}

module.exports = {
    Server,
};