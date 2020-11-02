const { IPCServer } = require('../../src');
const { packet } = require('tiny-application-layer-protocol');
new IPCServer(function(client) {
    client.end(packet('hello'));
    client.on('data', (data) => {
        console.log('receive', data);
    });
});
