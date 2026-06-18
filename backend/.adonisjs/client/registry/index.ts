/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.auth.register': {
    methods: ["POST"],
    pattern: '/auth/signup',
    tokens: [{"old":"/auth/signup","type":0,"val":"auth","end":""},{"old":"/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.auth.register']['types'],
  },
  'auth.auth.login': {
    methods: ["POST"],
    pattern: '/auth/login',
    tokens: [{"old":"/auth/login","type":0,"val":"auth","end":""},{"old":"/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.auth.login']['types'],
  },
  'auth.auth.logout': {
    methods: ["DELETE"],
    pattern: '/auth/logout',
    tokens: [{"old":"/auth/logout","type":0,"val":"auth","end":""},{"old":"/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.auth.logout']['types'],
  },
  'account.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/account/profile',
    tokens: [{"old":"/account/profile","type":0,"val":"account","end":""},{"old":"/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['account.profile.show']['types'],
  },
  'servers.servers.store': {
    methods: ["POST"],
    pattern: '/servers/create',
    tokens: [{"old":"/servers/create","type":0,"val":"servers","end":""},{"old":"/servers/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['servers.servers.store']['types'],
  },
  'servers.servers.list': {
    methods: ["GET","HEAD"],
    pattern: '/servers',
    tokens: [{"old":"/servers","type":0,"val":"servers","end":""}],
    types: placeholder as Registry['servers.servers.list']['types'],
  },
  'servers.servers.get': {
    methods: ["GET","HEAD"],
    pattern: '/servers/:id',
    tokens: [{"old":"/servers/:id","type":0,"val":"servers","end":""},{"old":"/servers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['servers.servers.get']['types'],
  },
  'agents.ping': {
    methods: ["POST"],
    pattern: '/agent/ping',
    tokens: [{"old":"/agent/ping","type":0,"val":"agent","end":""},{"old":"/agent/ping","type":0,"val":"ping","end":""}],
    types: placeholder as Registry['agents.ping']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
