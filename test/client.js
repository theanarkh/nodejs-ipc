const { Client } = require('../src/client'); 
const client = new Client({port: 80, path: '/tmp/unix.sock'})
client.end('hello');
client.on('message', function(res) {
  console.log('receive', res);
})
