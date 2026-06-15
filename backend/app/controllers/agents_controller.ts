import type { HttpContext } from '@adonisjs/core/http'
import AgentService from '#services/agent_service'

export default class AgentMetricsController {
  async ping({ request, response }: HttpContext) {
    const { serverId, metrics } = request.only(['serverId', 'metrics'])
    
    const token = request.header('authorization')?.split(' ')[1]

    if (!token || !serverId) {
      return response.unauthorized({ error: 'Données manquantes' })
    }

    try {

      await AgentService.handlePing(token, serverId, metrics)


      return response.ok({ status: 'received' })
    } catch (error: any) {
      return response.badRequest({ error: error.message })
    }
  }
}
