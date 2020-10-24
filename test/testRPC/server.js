const { Server } = require('../../src');
const { packet } = require('tiny-application-layer-protocol');
new Server({port: 80}, function(client) {
    client.on('message', (data) => {
        console.log('receive', data);
        client.send(packet('world', data.seq));
    });
    client.on('end', (data) => {
        client.end();
    });
});
