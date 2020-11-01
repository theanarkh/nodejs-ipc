const { IPCServer } = require('../../src');
const { packet } = require('tiny-application-layer-protocol')
// window下使用tcp，非window使用unix域，即使传了port 
new IPCServer({allowHalfOpen: true}, function(client) {
    client.on('data', (data) => {
        console.log('receive', data);
        client.end(packet('world', data.seq));
    });
});
