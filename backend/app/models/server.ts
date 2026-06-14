import { DateTime } from 'luxon'

import User from '#models/user'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Server extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare name: string

  @column()
  declare ipAddress: string

  @column()
  declare description: string | null

  @column()
  declare agentToken: string

  @column()
  declare status: 'online' | 'offline' | 'pending'

  @column.dateTime()
  declare lastPingAt: DateTime | null

  @column()
  declare osName: string | null

  @column()
  declare osVersion: string | null

  @column()
  declare cpuModel: string | null

  @column()
  declare cpuCores: number | null

  @column()
  declare ramTotal: number | null

  @column()
  declare dockerVersion: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
