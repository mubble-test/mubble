import { RunContextServer } from '../rc-server';
import Mail = require('nodemailer/lib/mailer');
export declare type SmtpConfig = {
    email: string;
    password: string;
};
export declare type MailParts = {
    email: string;
    cc?: Array<string>;
    subject: string;
    firstName?: string;
    lastName?: string;
    senderName: string;
    message: string;
    indyDisclaimer: boolean;
    headerImage?: {
        name: string;
        path: string;
    };
    attachments?: Array<MailAttachment>;
};
export declare type MailAttachment = Mail.Attachment;
export declare class Mailer {
    private transport;
    private senderEmail;
    constructor(rc: RunContextServer, config: SmtpConfig);
    sendEmail(rc: RunContextServer, emailParts: MailParts): Promise<void>;
    private encodeEmail;
    private getRandomId;
    private composeHtml;
}
