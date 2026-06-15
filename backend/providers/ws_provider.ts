import type { ApplicationService } from '@adonisjs/core/types'
import wsService from '#services/ws_service'

export default class WsProvider {
  constructor(protected app: ApplicationService) {}


  public async ready() {
    wsService.boot()
    console.log('[Vesselify] Serveur WebSocket Socket.io initialisé avec succès via Provider !')
  }
  public async shutdown() {
    if (wsService.io) {
      wsService.io.close()
    }
  }
}
