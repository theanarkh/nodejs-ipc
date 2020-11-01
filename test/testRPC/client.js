const { RPCClient } = require('../../src');
const { packet, seq } = require('tiny-application-layer-protocol');
const client = new RPCClient({host: '127.0.0.1', port: 80});
client.write(packet('hello', seq()));
client.on('message', function(res) {
  console.log('receive', res);
})
