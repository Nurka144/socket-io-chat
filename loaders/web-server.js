const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({login: String, is_online: Number});
const User = mongoose.model("User", userScheme);

module.exports.User = User;

const log = require('../config/winston');
const config = require('../config/config');
const socket = require('./socket');
const router = require('./routes');

let httpServer;
let api = '/api/1.0';

async function init() {
    return new Promise((resolve, reject) => {
        const app = express();
        httpServer = http.createServer(app);
        app.use(cors())
        app.use(bodyParser.json())
        app.use(function(request, response, next) {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Expose-Headers", "Content-Disposition");
            response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            response.contentType('application/json');
            next();
        });
        
        socket(httpServer)

        app.use(api, router)

        httpServer.
            listen(config.get('web-server:port'))
                .on('listening', async () => {
                    log.info(`Web server listening on localhost:${config.get('web-server:port')}`);
                    resolve(app);
                })
                .on('error', () => reject(error))

    })
}

module.exports.init = init;

async function close() {
    return new Promise((resolve, reject) => {
        httpServer
            .close((error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            })
    })
}

module.exports.close = close;