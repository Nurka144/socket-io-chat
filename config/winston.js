const appRoot = require('app-root-path');
const winston = require('winston');
const { format } = require('winston');

// define the custom settings for each transport (file, console)
const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        silent: process.env.AUTO_TEST === 'on'
    },
    access: {
        level: 'info',
        filename: `${appRoot}/logs/access.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        silent: process.env.AUTO_TEST === 'on'
    },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// логгер для access.log
const accessLoger = winston.createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [new winston.transports.File(options.access)],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  // eslint-disable-next-line no-unused-vars
    write(message, encoding) {
        accessLoger.info(message);
    },
};

module.exports = logger;
