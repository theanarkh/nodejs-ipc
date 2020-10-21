const fs = require('fs');
const net = require('net');
const { EventEmitter } = require('events');
const os = require('os');
const { Parser } = require('./lib/protocol');
const { port, path } = require('./config');

// Client代表一个和server建立连接的客户端
class Client extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }
  send(data) {
    this.options.client.write(data);
  }
  end(data) {
    this.options.client.end(data);
  }
}

class Server extends EventEmitter {
    constructor(options, connectionListener) {
      super();
      this.options = { ...options };
      // 根据平台处理参数
      if (os.platform() === 'win32') {
        !~~this.options.port && (this.options.port = port);
        delete this.options.path;
      } else {
        !this.options.path && (this.options.path = path); 
        delete this.options.host;
        delete this.options.port;
        fs.existsSync(this.options.path) && fs.unlinkSync(this.options.path);
        process.on('exit', () => {
          fs.existsSync(this.options.path) && fs.unlinkSync(this.options.path);
        });
      }
      this.server = net.createServer({allowHalfOpen: true}, (client) => {
        const _client = new Client({client});
        typeof connectionListener === 'function' && connectionListener(_client);
        const parser = new Parser({
            cb: function(packet) {
              _client.emit('message', packet);
            }
        })
        client.on('data', parser.parse.bind(parser));
        client.on('end', () => {
          // 触发end事件
          _client.emit('end');
          // 用户侧没有关闭写端，则默认关闭
          !client.writableEnded && this.options.autoEnd !== false && client.end();
        });
        client.on('error', (error) => {
          _client.listenerCount('error') > 0 && _client.emit('error', error);
        });
      });
      this.server.listen(this.options, () => {
        this.emit('listen');
      });
      this.server.on('error', (error) => {
        this.listenerCount('error') > 0 && this.emit('error', error);
      });
    }
}

module.exports = {
    Server,
};
