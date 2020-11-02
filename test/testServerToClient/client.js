const { IPCClient } = require('../../src');
const { packet, seq } = require('tiny-application-layer-protocol');
const client = new IPCClient({allowHalfOpen: true});
client.on('data', function(res) {
  console.log('receive', res);
  client.end(packet('world', res.seq));
})
