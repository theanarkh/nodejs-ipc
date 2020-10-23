const { Client } = require('../../src');
const { packet, seq } = require('tiny-application-layer-protocol');
const client = new Client({port: 80, path: '/tmp/unix.sock'})
client.send(packet('hello', seq()));
client.on('message', function(res) {
  console.log('receive', res);
})
