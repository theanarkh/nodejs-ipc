const { Server } = require('../../src');
const { packet } = require('tiny-application-layer-protocol')
// window下使用tcp，非window使用unix域，即使传了port 
new Server({port: 80, path: '/tmp/unix.sock', allowHalfOpen: true}, function(client) {
    client.on('message', (data) => {
        console.log('receive', data);
        client.end(packet('world', data.seq));
    });
});
