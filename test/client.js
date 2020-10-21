const { Client, packet, seq } = require('../');
const client = new Client({port: 80, path: '/tmp/unix.sock'})
client.end(packet('hello', seq()));
client.on('message', function(res) {
  console.log('receive', res);
})
