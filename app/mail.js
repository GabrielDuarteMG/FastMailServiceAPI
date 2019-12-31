const nodemailer = require('nodemailer');

const nullOrEmpty = (variable) => {
    if (variable == undefined ||
        variable == '' ||
        variable == null ||
        variable == 'null')
        return true;
    else
        return false
}
let init = (req, res, config) => {

    if (req.method == 'POST') {
        /* Comment To development 
        if (!req.get('origin').includes('https://gabrields.dev')) {
            res.status(400);
            res.send('Bad Origin Request')
            return
        }*/
        let from = 'no.replygabrields@gmail.com';
        let to = 'contact@gabrields.dev';
        let subject = req.body.subject;
        let text = req.body.text;
        if (nullOrEmpty(subject) ||
            nullOrEmpty(text)) {
            res.status(400);
            res.send(`Invalid Request`);
        } else {
            const transporter = nodemailer.createTransport({
                host: config.MailHost,
                port: config.MailPort,
                secure: (config.MailPort == 465 ? true : false),
                auth: {
                    user: config.MailUser,
                    pass: config.MailPass
                },
                tls: { rejectUnauthorized: false }
            });
            transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                text: text
            }, (err, info) => {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else {
                    console.log(info);
                    res.status(200);
                    res.send('sucess');
                }
            })
        }
    } else {
        res.status(400);
        res.send('Invalid method')
    }
}

module.exports.init = init;
