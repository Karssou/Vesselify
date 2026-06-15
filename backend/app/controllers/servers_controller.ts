import Server from '#models/server'
import { createServerValidator } from '#validators/server' // Ton validateur VineJS
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import crypto from 'node:crypto'

export default class ServersController {
  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createServerValidator)

    const user = auth.getUserOrFail()

    const secureToken = `vesselify_vps_${crypto.randomBytes(32).toString('hex')}`

    const server = await Server.create({
      userId: String(user!.id),
      name: payload.name,
      ipAddress: payload.ipAddress,
      description: payload.description,
      agentToken: secureToken,
      status: 'pending',
    })

    response.ok({
      success: true,
      data: server,
      timestamp: DateTime.now(),
    })
  }

  async list({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const serversList = await Server.query().where('userId', user.id).orderBy('createdAt', 'desc')

    response.ok({
      success: true,
      data: serversList,
      timestamp: DateTime.now(),
    })
  }
}
