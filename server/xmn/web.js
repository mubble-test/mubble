"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Fri Apr 14 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = exports.Web = exports.WEB_SERVER_TYPE = void 0;
const http = require("http");
const https = require("https");
const https_server_1 = require("./https-server");
const https_third_server_1 = require("./https-third-server");
const wss_server_1 = require("./wss-server");
const worker_1 = require("../cluster/worker");
var WEB_SERVER_TYPE;
(function (WEB_SERVER_TYPE) {
    WEB_SERVER_TYPE[WEB_SERVER_TYPE["HTTP"] = 0] = "HTTP";
    WEB_SERVER_TYPE[WEB_SERVER_TYPE["HTTPS"] = 1] = "HTTPS";
    WEB_SERVER_TYPE[WEB_SERVER_TYPE["WEB_SOCKET"] = 2] = "WEB_SOCKET";
})(WEB_SERVER_TYPE = exports.WEB_SERVER_TYPE || (exports.WEB_SERVER_TYPE = {}));
class Web {
    constructor() {
        if (exports.web)
            throw ('Router is singleton. It cannot be instantiated again');
    }
    init(rc, router, httpConfig, httpsConfig, websocketConfig, thirdHttpConfig) {
        this.httpConfig = httpConfig;
        this.httpsConfig = httpsConfig;
        this.websocketConfig = websocketConfig;
        this.thirdHttpsConfig = thirdHttpConfig;
        this.router = router;
        if (this.httpConfig) {
            const httpReqManager = new https_server_1.HttpsServer(rc, this.router);
            this.httpServer = http.createServer(httpReqManager.requestHandler.bind(httpReqManager));
        }
        if (this.httpsConfig) {
            const port = this.httpsConfig.port;
            if (this.httpConfig && this.httpConfig.port === port) {
                throw ('https port cannot be same as http port');
            }
            // if (this.websocketConfig && this.websocketConfig.port === port) {
            //   throw('https port cannot be same as ws port')
            // }
            const httpReqManager = new https_server_1.HttpsServer(rc, this.router);
            this.httpsServer = https.createServer(this.httpsConfig, httpReqManager.requestHandler.bind(httpReqManager));
        }
        if (this.websocketConfig) {
            let wsServer;
            if (this.httpsConfig && this.httpsConfig.port === this.websocketConfig.port) {
                wsServer = this.httpsServer;
            }
            else if (this.httpConfig && this.httpConfig.port === this.websocketConfig.port) {
                wsServer = this.httpServer;
            }
            else {
                wsServer = this.wsHttpServer = http.createServer();
            }
            this.wsReqManager = new wss_server_1.WssServer(rc, this.router, wsServer);
        }
        if (this.thirdHttpsConfig) {
            const port = this.thirdHttpsConfig.port;
            if (this.httpConfig && this.httpConfig.port === port)
                throw ('third party https port cannot be same as the http port');
            if (this.httpsConfig && this.httpsConfig.port === port)
                throw ('third party https port cannot be same as the https port');
            const httpReqManager = new https_third_server_1.HttpsThirdServer(rc, this.router);
            this.thirdHttpServer = http.createServer(httpReqManager.requestHandler.bind(httpReqManager));
        }
    }
    async start(rc) {
        if (this.httpServer)
            await this.listen(rc, this.httpServer, this.httpConfig);
        if (this.wsHttpServer)
            await this.listen(rc, this.wsHttpServer, this.websocketConfig);
        if (this.httpsServer)
            await this.listen(rc, this.httpsServer, this.httpsConfig);
        if (this.thirdHttpServer)
            await this.listen(rc, this.thirdHttpServer, this.thirdHttpsConfig);
    }
    listen(rc, httpServer, config) {
        return new Promise((resolve, reject) => {
            httpServer.listen(config.port, () => {
                resolve();
            });
            httpServer.on('close', () => {
                if (rc.runState.isStopping()) {
                    rc.isStatus() && rc.status(rc.getName(this), 'Exiting on http close event');
                    worker_1.clusterWorker.voluntaryExit(rc);
                }
                rc.isError() && rc.error(rc.getName(this), 'HTTPServer received an unexpected close event. Shutting down!');
                process.exit(1);
            });
            httpServer.on('clientError', (err, socket) => {
                rc.isStatus() && rc.status(rc.getName(this), 'httpServer.clientError', err, 'ignoring');
                socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
            });
        });
    }
}
exports.Web = Web;
exports.web = new Web();
//# sourceMappingURL=web.js.map