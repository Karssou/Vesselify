import { Server as SocketIOServer } from 'socket.io'
import server from '@adonisjs/core/services/server'
import AgentService from '#services/agent_service'
import { DateTime } from 'luxon'
import Server from '#models/server'

class WsService {
  public io: SocketIOServer | null = null

  public boot() {
    // Si le serveur est déjà lancé, on ne fait rien
    if (this.io) return

    // On récupère le serveur Node natif sous-jacent d'Adonis v6
    const httpServer = server.getNodeServer()

    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
      },
      transports: ['websocket', 'polling'],
    })

    this.listen()
  }

  private listen() {
    if (!this.io) return

    this.io.on('connection', async (socket) => {
      const token =
        socket.handshake.headers['authorization']?.split(' ')[1] || socket.handshake.auth.token
      const serverId = socket.handshake.query.serverId as string

      if (!token || !serverId) {
        socket.disconnect()
        return
      }

      console.log(`Tentative de connexion WS pour le serveur : ${serverId}`)

      socket.on('agent:register', async (data) => {
        console.log(`[First Ping] Reçu pour le serveur : ${serverId}`, data)
        const { osName, osVersion, cpuModel, cpuCores, ramTotal, dockerVersion } = data

        try {
          const vps = await Server.find(serverId)

          if (!vps) {
            console.error(`[First Ping] Serveur introuvable en BDD : ${serverId}`)
            return
          }

          vps.merge({
            osName,
            osVersion,
            cpuModel,
            cpuCores,
            ramTotal,
            dockerVersion, // Pense à le rajouter si tu l'as mis en BDD !
            status: 'online',
            lastPingAt: DateTime.now(),
          })

          await vps.save()
          console.log(`[First Ping] Specs du serveur ${vps.name} enregistrées avec succès !`)

          vps.status = 'online'
          vps.lastPingAt = DateTime.now()
          await vps.save()
          console.log(`[Ping] Statut mis à jour pour le serveur ${vps.name}`)
        } catch (error) {
          console.error(`Erreur lors du traitement du First Ping :`, error)
        }
      })

      socket.on('agent:metrics', async (data: any) => {
        try {
          await AgentService.handlePing(token, serverId, data.metrics)

          // Ecoute nuxt
          this.io?.to(`server:${serverId}`).emit('front:metrics', data.metrics)
        } catch (error) {
          // Si le token est invalide, on vire l'agent
          socket.disconnect()
        }
      })

      // 3. Gestion de la déconnexion mécanique (crash de l'agent, coupure réseau)
      socket.on('disconnect', () => {
        console.log(`❌ Connexion WS fermée pour le serveur : ${serverId}`)
      })
    })
  }
}

// On exporte une instance unique (Singleton)
const wsService = new WsService()
export default wsService
