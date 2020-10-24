const net = require('net');
const os = require('os');
const { EventEmitter } = require('events');
const { FSM } = require('tiny-application-layer-protocol');
const { port, path } = require('./config');

class Client extends EventEmitter {
  constructor(options) {
    super();
    this.options = { ...options };
    this.socket = null;
    this.fsm = new FSM({
        cb: (packet) => {
            this.emit('message', packet);
        }
    });
    this.options.preConnect === true && this.initOnce();
  }
  initOnce() {
    if (!this.socket) {
      if (os.platform() === 'win32' || this.options.isRPC) {
        !~~this.options.port && (this.options.port = this.options.isRPC ? 80 : port);
        delete this.options.path;
      } else {
        !this.options.path && (this.options.path = path); 
        delete this.options.host;
        delete this.options.port;
      }
      this.socket = net.connect({allowHalfOpen: true, ...this.options});
      this.socket.on('data', this.fsm.run.bind(this.fsm));
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
