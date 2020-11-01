const { IPCServer } = require('../../src');
const { packet } = require('tiny-application-layer-protocol');
new IPCServer({path: '/tmp/unix.sock'}, function(client) {
    client.end(packet('hello'));
    client.on('message', (data) => {
        console.log('receive', data);
    });
});
