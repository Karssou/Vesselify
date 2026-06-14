import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { loginValidator, signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const { fullName, email, password } = await request.validateUsing(signupValidator)

    const user = await User.create({ fullName, email, password })
    const token = await User.accessTokens.create(user)

    return response.ok({
      success: true,
      data: { user: UserTransformer.transform(user), token: token.value!.release() },
      timestamp: Date.now(),
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      success: true,
      data: { user: UserTransformer.transform(user), token: token.value!.release() },
      timestamp: DateTime.now(),
    })
  }

  async logout({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }

    return {
      message: 'Logged out successfully',
    }
  }
}
