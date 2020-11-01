const { RPCServer } = require('../../src');
const { packet } = require('tiny-application-layer-protocol');
new RPCServer(function(client) {
    client.on('message', (data) => {
        console.log('receive', data);
        client.end(packet('world', data.seq));
    });
    client.on('end', (data) => {
        client.end();
    });
});
