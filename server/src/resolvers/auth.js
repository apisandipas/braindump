import { promisify } from 'util'
import crypto from 'crypto'
import { tryLogin } from 'services/auth'
import { formatErrors } from 'services/errors'
import mailer from 'services/mailer'

const TWENTY_FOUR_HOURS = 60 * 60 * 24 * 1000
const APP_DOMAIN = process.env.APP_DOMAIN || 'localhost'

export default {
  Query: {
    me: async (_, __, { req, models }) => {
      if (!req.user || !req.user.id) return null
      const user = await models.User.where({ id: req.user.id }).fetch()
      return user.toJSON()
    }
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      try {
        const existingUser = await models.User.findOne({ email: args.email }, { require: false })
        if (existingUser) {
          return {
            ok: false,
            errors: [
              {
                path: 'email',
                message: `Error! Your must pick a unique email.`
              }
            ]
          }
        }
        const user = await models.User.create(args)
        if (user) {
          return {
            ok: true,
            user: user.toJSON()
          }
        }
      } catch (err) {
        console.log('register err', JSON.stringify(err))
        return {
          ok: false,
          errors: formatErrors(err)
        }
      }
    },
    login: async (_, { email, password }) => tryLogin(email, password),
    forgotPassword: async (_, { email }, { models }) => {
      try {
        const user = await models.User.where({ email }).fetch()
        // TODO Consider removing this message or not passing it client at least
        if (!user) throw new Error('User not found for this email address')

        const randomBytes = promisify(crypto.randomBytes)
        const buffer = await randomBytes(20)
        const token = buffer.toString('hex')
        user.set('password_reset_token', token)
        user.set('password_reset_expires', Date.now() + TWENTY_FOUR_HOURS)
        await user.save()

        const emailData = {
          to: user.get('email'),
          from: `no-reply@${APP_DOMAIN}`,
          template: 'forgot-password',
          subject: 'Password help has arrived!',
          context: {
            url: `https://${APP_DOMAIN}/reset-password?token=${token}`,
            name: user.get('username')
          }
        }

        await mailer.sendMail(emailData)

        return {
          ok: true
        }
      } catch (err) {
        return {
          ok: false,
          error: formatErrors(err)
        }
      }
    },
    resetPassword: async (_, { token, password, passwordConfirm }, { models }) => {
      try {
        const user = await models.User.where({ password_reset_token: token })
          .where('password_reset_expires', '>', Date.now())
          .fetch()
        if (!user) throw new Error('Invalid password reset token!')
        if (password !== passwordConfirm) {
          throw new Error("Passwords don't match!")
        }
        user.set('password', password)
        user.set('password_reset_token', null)
        user.set('password_reset_expires', null)
        await user.save()
        const emailData = {
          to: user.get('email'),
          from: `no-reply@${APP_DOMAIN}`,
          template: 'password-reset',
          subject: 'Password Reset Confirmation',
          context: {
            name: user.get('username')
          }
        }
        await mailer.sendMail(emailData)
        return {
          ok: true
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err)
        }
      }
    }
  }
}
