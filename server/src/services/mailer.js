import hbs from 'nodemailer-express-handlebars'
import nodemailer from 'nodemailer'
import mailgunTransport from 'nodemailer-mailgun-transport'

const mailgunOptions = {
  auth: {
    api_key: process.env.MAILGUN_ACTIVE_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}

const transport = mailgunTransport(mailgunOptions)
const smtpTransport = nodemailer.createTransport(transport)

var handlebarsOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: '../server/src/emails/',
    layoutsDir: '../server/src/emails/',
    defaultLayout: 'layout.hbs'
  },
  viewPath: '../server/src/emails/',
  extName: '.hbs'
}

smtpTransport.use('compile', hbs(handlebarsOptions))

export default smtpTransport
