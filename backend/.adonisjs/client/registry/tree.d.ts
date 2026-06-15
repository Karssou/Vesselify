/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    auth: {
      register: typeof routes['auth.auth.register']
      login: typeof routes['auth.auth.login']
      logout: typeof routes['auth.auth.logout']
    }
  }
  account: {
    profile: {
      show: typeof routes['account.profile.show']
    }
  }
  servers: {
    servers: {
      store: typeof routes['servers.servers.store']
      list: typeof routes['servers.servers.list']
    }
  }
}
