const { RPCClient, RequestManager } = require('../../src');
const { packet, seq } = require('tiny-application-layer-protocol');
const requestManager = new RequestManager({timeout: 3000});
const client = new RPCClient({host: '127.0.0.1', port: 80});
const _seq = seq(); 
requestManager.set(_seq, {
  cb: function() {
    console.log(...arguments);
  }
})
client.write(packet('hello', _seq));
client.on('message', function(packet) {
  requestManager.exec(packet.seq, packet);
})
