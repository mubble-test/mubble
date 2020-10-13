"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendGMail = void 0;
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Mon Jul 29 2019
   Author     : Siddharth Garg
   
   Copyright (c) 2019 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
const nodemailer = require("nodemailer");
async function sendGMail(userId, password, from, addresses, subject, body) {
    //console.log(`Test1`);
    try {
        const transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'Gmail',
            auth: {
                user: userId,
                pass: password
            }
        });
        //console.log(`Test2`);
        if (addresses && addresses.length > 0) {
            const info = await transporter.sendMail({
                from: from,
                to: addresses.join(','),
                subject: subject,
                html: body,
            });
        }
        //console.log(`Sent Email with messageId: ${info.messageId}`)
    }
    catch (e) {
        throw e;
    }
}
exports.sendGMail = sendGMail;
//# sourceMappingURL=mailer.js.map