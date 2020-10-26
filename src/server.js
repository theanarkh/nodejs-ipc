const fs = require('fs');
const net = require('net');
const { EventEmitter } = require('events');
const os = require('os');
const { FSM } = require('tiny-application-layer-protocol');
const { port, path } = require('./config');

class Server extends EventEmitter {
    constructor(options, connectionListener) {
      super();
      if (typeof options === 'function') {
        options = {
          connectionListener,
        };
      } else {
        options = { ...options, connectionListener };
      }
      this.options = this.formatOptions(options);
      return net.createServer({allowHalfOpen: this.options.allowHalfOpen === true}, (client) => {
        client.send = client.write;
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
    formatOptions(_options) {
      const options = { ..._options };
      // 根据平台处理参数
      if (os.platform() === 'win32') {
        !~~options.port && (options.port = port);
        delete options.path;
      } else {
        !options.path && (options.path = path); 
        delete options.host;
        delete options.port;
        fs.existsSync(options.path) && fs.unlinkSync(options.path);
        process.on('exit', () => {
          fs.existsSync(options.path) && fs.unlinkSync(options.path);
        });
      }
      return options;
    }
}

module.exports = {
    Server,
};
