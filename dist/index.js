"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mailchimp_transactional_1 = __importDefault(require("@mailchimp/mailchimp_transactional"));
// Mandrill wants from_email / from_name separately; accept "Name <addr>" too.
const parseFrom = (value) => {
    const m = /^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/.exec(value || '');
    return m ? { from_email: m[2], ...(m[1] && { from_name: m[1] }) } : { from_email: value };
};
module.exports = {
    init(providerOptions, settings) {
        const mailchimp = (0, mailchimp_transactional_1.default)(providerOptions.apiKey);
        return {
            send(options) {
                return new Promise((resolve, reject) => {
                    const { from, to, cc, bcc, replyTo, subject, text, html, ...rest } = options;
                    const recipients = [];
                    if (to) {
                        recipients.push({
                            email: to,
                            type: 'to',
                        });
                    }
                    if (cc) {
                        recipients.push({
                            email: cc,
                            type: 'cc',
                        });
                    }
                    if (bcc) {
                        recipients.push({
                            email: bcc,
                            type: 'bcc',
                        });
                    }
                    const message = {
                        ...parseFrom(from || settings.defaultFrom),
                        to: recipients,
                        // replyTo: replyTo || settings.defaultReplyTo,
                        subject,
                        text,
                        html,
                        ...rest,
                    };
                    const body = {
                        message,
                    };
                    mailchimp.messages.send(body).then((response) => {
                        //verify if response is  MailChimp.MessagesSendResponse[] or AxiosError<unknown, any>
                        if (!Array.isArray(response) || response.length === 0) {
                            const data = response?.response?.data;
                            return reject(new Error(data ? `Mailchimp ${data.name}: ${data.message}` : 'Invalid response from Mailchimp'));
                        }
                        if (["sent", "queued", "scheduled"].includes(response[0].status)) {
                            resolve();
                        }
                        else {
                            reject(new Error(response[0].reject_reason || 'Failed to send email'));
                        }
                    }).catch((error) => {
                        reject(error);
                    });
                });
            },
        };
    },
};
