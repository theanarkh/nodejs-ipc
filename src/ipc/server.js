const fs = require('fs');
const net = require('net');
const { EventEmitter } = require('events');
const { path } = require('../config');

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
      try {
        fs.existsSync(options.path) && fs.unlinkSync(options.path);
      } catch(e) {

      }
      this.options = { path, ...options };
      return net.createServer({allowHalfOpen: this.options.allowHalfOpen, pauseOnConnect: this.options.pauseOnConnect}, (client) => {
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
