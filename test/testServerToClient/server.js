const { Server } = require('../../src');
const { packet } = require('tiny-application-layer-protocol');
new Server({port: 80, path: '/tmp/unix.sock'}, function(client) {
    client.end(packet('hello'));
    client.on('message', (data) => {
        console.log('receive', data);
    });
});
