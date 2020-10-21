const { Server } = require('../src/server');
// window下使用tcp，非window使用unix域，即使传了port 
new Server({port: 80, path: '/tmp/unix.sock'}, function(client) {
    client.on('message', (data) => {
        console.log('receive', data);
        client.send('world');
    });
    client.on('end', (data) => {
        client.end();
    });
});
