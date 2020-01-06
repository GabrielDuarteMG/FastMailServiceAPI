const nodemailer = require("nodemailer");
var validator = require("email-validator");
const EmailValidator = require("email-deep-validator");
const domainValidator = new EmailValidator();
/*
{
  "subject": "Subject",
  "emailContact" : "email@email.com",
  "text": "Body Mail"
}
*/
const nullOrEmpty = variable => {
    if (
        variable == undefined ||
        variable == "" ||
        variable == null ||
        variable == "null"
    )
        return true;
    else return false;
};
let init = async(req, res, config) => {
    try {
        if (req.method == "POST" || req.method == "OPTIONS") {

            /* Comment To development - Origin Block
            if (!req.get("origin").includes("https://?")) {
                res.status(400);

                res.send("Bad Origin Request");
                return;
            }*/
            let from = "no.replygabrields@gmail.com";
            let to = "contact@gabrields.dev";
            let jsonBody = JSON.parse(req.body)
            let subject = jsonBody.subject;
            let emailContact = jsonBody.emailContact;
            let text = jsonBody.text;
            let emailValid = validator.validate(jsonBody.emailContact);
            console.log(req.body);
            if (
                nullOrEmpty(subject) ||
                nullOrEmpty(text) ||
                nullOrEmpty(emailContact)
            ) {
                res.status(400);
                res.send(`Invalid Request`);
                return;
            } else {
                if (emailValid == false) {
                    res.status(400);
                    res.send(`Invalid email`);
                    return;
                } else {
                    const { validDomain, validMailbox } = await domainValidator.verify(
                        jsonBody.emailContact
                    );
                    //Validation if validMailbox is null
                    if (!(validDomain == null ? true : validDomain) ||
                        !(validMailbox == null ? true : validMailbox)
                    ) {
                        console.log(
                            `Validation Email Failed: ValidFormat: ${emailValid} || ValidDomain: ${validDomain} || ValidMailBox: ${validMailbox}`
                        );
                        res.status(400);
                        res.send("Invalid email");
                        return;
                    }
                }
                const transporter = nodemailer.createTransport({
                    host: config.MailHost,
                    port: config.MailPort,
                    secure: config.MailPort == 465 ? true : false,
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
                    },
                    (err, info) => {
                        if (err) {
                            res.status(500);
                            res.send(err);
                        } else {
                            console.log(info);
                            res.status(200);
                            res.send(info);
                        }
                    }
                );
            }
        } else {
            res.status(400);
            res.send("Invalid method");
        }
    } catch (error) {
        res.status(500);
        res.send(error);
    }
};
module.exports.init = init;