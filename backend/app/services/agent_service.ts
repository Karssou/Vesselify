import Server from '#models/server'
import { DateTime } from 'luxon'

export default class AgentService {
  /**
   * Traite les métriques reçues (via HTTP ou WebSocket)
   */
  public static async handlePing(token: string, serverId: string, metrics?: any) {

    const vps = await Server.query().where('id', serverId).where('agentToken', token).first()

    if (!vps) {
      throw new Error('Unauthorized or Unknown Server')
    }

    vps.status = 'online'
    vps.lastPingAt = DateTime.now()

    if (metrics) {

      console.log(
        `[${vps.name}] CPU: ${metrics.cpuCurrentUsage}%, RAM: ${metrics.ram.usagePercentage}%`
      )
    }

    await vps.save()
    return vps
  }
}
