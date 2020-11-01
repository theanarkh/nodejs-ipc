const { IPCClient } = require('../../src');
const { packet, seq } = require('tiny-application-layer-protocol');
const client = new IPCClient({path: '/tmp/unix.sock', allowHalfOpen: true});
client.on('message', function(res) {
  console.log('receive', res);
  client.end(packet('world', res.seq));
})
