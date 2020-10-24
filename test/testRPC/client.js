const { Client } = require('../../src');
const { packet, seq } = require('tiny-application-layer-protocol');
const client = new Client({host: '127.0.0.1', isRPC: true});
client.send(packet('hello', seq()));
client.on('message', function(res) {
  console.log('receive', res);
})
