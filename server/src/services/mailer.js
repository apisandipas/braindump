import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";
import mailgunTransport from "nodemailer-mailgun-transport";

const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_ACTIVE_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};

const transport = mailgunTransport(mailgunOptions);
const smtpTransport = nodemailer.createTransport(transport);

var handlebarsOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: "../app/src/emails/",
    layoutsDir: "../app/src/emails/",
    defaultLayout: "layout.hbs"
  },
  viewPath: "../app/src/emails/",
  extName: ".hbs"
};

smtpTransport.use("compile", hbs(handlebarsOptions));

export default smtpTransport;
