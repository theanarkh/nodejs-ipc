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
      this.options = { path, ...options };
      try {
        fs.existsSync(this.options.path) && fs.unlinkSync(this.options.path);
      } catch(e) {

      }
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
