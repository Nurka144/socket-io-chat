const nconf = require('nconf');
const config = '/config/config.json';

nconf.argv().env().file({
        file: process.cwd() + config
    });

module.exports = nconf;
