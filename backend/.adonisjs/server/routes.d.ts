import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.auth.register': { paramsTuple?: []; params?: {} }
    'auth.auth.login': { paramsTuple?: []; params?: {} }
    'auth.auth.logout': { paramsTuple?: []; params?: {} }
    'account.profile.show': { paramsTuple?: []; params?: {} }
    'servers.servers.store': { paramsTuple?: []; params?: {} }
    'servers.servers.list': { paramsTuple?: []; params?: {} }
    'agents.ping': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'account.profile.show': { paramsTuple?: []; params?: {} }
    'servers.servers.list': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'account.profile.show': { paramsTuple?: []; params?: {} }
    'servers.servers.list': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.auth.register': { paramsTuple?: []; params?: {} }
    'auth.auth.login': { paramsTuple?: []; params?: {} }
    'servers.servers.store': { paramsTuple?: []; params?: {} }
    'agents.ping': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'auth.auth.logout': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}