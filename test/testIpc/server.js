const { IPCServer } = require('../../src');
const { packet } = require('tiny-application-layer-protocol');
new IPCServer(function(client) {
    console.log(1)
    client.on('data', (data) => {
        console.log('receive', data);
        client.write(packet('world', data.seq));
    });
});
