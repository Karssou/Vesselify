import type { HttpContext } from '@adonisjs/core/http'
import AgentService from '#services/agent_service'
import wsService from '#services/ws_service'

export default class AgentMetricsController {
  async ping({ request, response }: HttpContext) {
    const { serverId, metrics } = request.only(['serverId', 'metrics'])

    const token = request.header('authorization')?.split(' ')[1]

    if (!token || !serverId) {
      return response.unauthorized({ error: 'Données manquantes' })
    }

    try {
      await AgentService.handlePing(token, serverId, metrics)

      if (metrics && wsService.io) {
        wsService.io.to(`server:${serverId}`).emit('front:metrics', metrics)
      }

      return response.ok({ status: 'success', message: 'Metrics processed and broadcasted' })
    } catch (error: any) {
      if (error.message.includes('invalide') || error.message.includes('unauthorized')) {
        return response.unauthorized({ error: 'Token invalide ou expiré.' })
      }
      return response.badRequest({ error: error.message })
    }
  }
}
