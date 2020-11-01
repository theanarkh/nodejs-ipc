const os = require('os');

module.exports = {
    path: os.platform() === 'win32' ? '\\\\?\\pipe\\ipc' : '/tmp/unix.sock',
};