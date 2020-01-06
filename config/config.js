/*
    Arquivo de configuração;
*/

let port = process.env.PORT || 3000;
let MailHost = 'smtp.gmail.com';
let MailUser = '?';
let MailPass = `?`;
let MailPort = 587;

module.exports.port = port;
module.exports.MailUser = MailUser;
module.exports.MailHost = MailHost;
module.exports.MailPass = MailPass;
module.exports.MailPort = MailPort;