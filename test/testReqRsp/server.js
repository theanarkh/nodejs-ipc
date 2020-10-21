const { Server, packet, seq } = require('../../');
// window下使用tcp，非window使用unix域，即使传了port 
new Server({port: 80, path: '/tmp/unix.sock'}, function(client) {
    client.on('message', (data) => {
        console.log('receive', data);
        setTimeout(() => {
            client.send(packet('world', data.seq));
        }, 2000)
    });
    client.on('end', (data) => {
        client.end();
    });
});
