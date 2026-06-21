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
      const serverId = socket.handshake.query.serverId as string
      const token =
        socket.handshake.headers['authorization']?.split(' ')[1] || socket.handshake.auth.token

      // Sécurité de base : il faut au moins l'ID du serveur ciblé
      if (!serverId) {
        console.log(`❌ Connexion rejetée : Aucun serverId fourni (Socket: ${socket.id})`)
        socket.disconnect()
        return
      }

      await socket.join(`server:${serverId}`)
      console.log(`Connexion établie. Socket ${socket.id} a rejoint la room : server:${serverId}`)

      const isAgent = !!token

      if (isAgent) {
        console.log(`[Agent] Connecté pour le serveur : ${serverId}`)

        // ENREGISTREMENT INFORMATIONS SERVEURS

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
              dockerVersion,
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

        // CANAL DES METRICS DU SERVEUR

        socket.on('agent:metrics', async (data: any) => {
          try {
            await AgentService.handlePing(token, serverId, data.metrics)
            if (this.io) {
              this.io.to(`server:${serverId}`).emit('front:metrics', data.metrics)
            }
          } catch (error) {
            // Si le token est invalide, on vire l'agent
            socket.disconnect()
          }
        })
      } else {
        console.log(`[CLIENT] Connecté en écoute sur le serveur : ${serverId}`)
      }
      socket.on('disconnect', () => {
        console.log(`❌ Connexion WS fermée pour le serveur : ${serverId}`)
      })
    })
  }
}

const wsService = new WsService()
export default wsService
