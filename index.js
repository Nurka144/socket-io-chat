const log = require('./config/winston');
const webserver = require('./loaders/web-server');
const mongoose = require('mongoose');


async function startUp() {
    log.info('Starting application');
    try {
        log.info('Initializing web server module');
        await mongoose.connect('mongodb://localhost:27017/chat', { 
                        useUnifiedTopology: true, 
                        useNewUrlParser: true, 
                        useFindAndModify: false }, async function(err) {
                            if (err) {
                                log.info(`Error connect DB`);
                            }
                            await webserver.init();
                        })
    } catch (error) {
        log.error(error);
        process.exit(1);
    }
}

startUp();

async function shutDown(error) {
    log.info('Shutting down');
    try {
        log.info('Clossing web server module');
        await webserver.close();
    } catch (error) {
        log.info('Encountered error', error);
    }
    if (error) {
        process.exit(1); 
    } else {
        process.exit(0);
    }
}

process.on('SIGTERM', () => {
    log.info('Received SIGTERM');

    shutDown();
});

process.on('SIGINT', () => {
    log.info('Received SIGINT');

    shutDown();
});

process.on('uncaughtException', (error) => {
    log.info('Uncaught exception');
    log.error(error);

    shutDown(error);
});
