const net = require('net');
const os = require('os');
const { EventEmitter } = require('events');
const { Parser, packet } = require('./lib/protocol');
const { port, path } = require('./config');

class Client extends EventEmitter {
  constructor(options) {
    super();
    this.options = { ...options };
    this.socket = null;
    this.parser = new Parser({
        cb: (packet) => {
            this.emit('message', packet);
        }
    })
  }
  initOnce() {
    if (!this.socket) {
      if (os.platform() === 'win32') {
        !~~this.options.port && (this.options.port = port);
        delete this.options.path;
      } else {
        !this.options.path && (this.options.path = path); 
        delete this.options.host;
        delete this.options.port;
      }
      this.socket = net.connect({allowHalfOpen: true, ...this.options});
      this.socket.on('data', this.parser.parse.bind(this.parser));
      this.socket.on('end', () => {
        // 触发end事件
        this.emit('end');
        // 用户侧没有关闭写端，则默认关闭
        !this.socket.writableEnded && this.options.autoEnd !== false && this.socket.end();
      });
      this.socket.on('error', (e) => {
        this.listenerCount('error') > 0 && this.emit('error', e);
      });
    }
  }
  send(data) {
    this.initOnce();
    this.socket.write(data);
    return this;
  }
  end(data) {
    this.initOnce();
    this.socket.end(data);
  }
}
module.exports = {
    Client,
};
