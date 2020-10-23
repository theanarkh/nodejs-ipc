const { Client, RequestManager } = require('../../src');
const { packet, seq } = require('tiny-application-layer-protocol');
const requestManager = new RequestManager({timeout: 3000});
const client = new Client({port: 80, path: '/tmp/unix.sock'});
const _seq = seq(); 
requestManager.set(_seq, {
  cb: function() {
    console.log(...arguments);
  }
})
client.send(packet('hello', _seq));
client.on('message', function(packet) {
  requestManager.exec(packet.seq, packet);
})
