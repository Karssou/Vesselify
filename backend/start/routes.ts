/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router.post('signup', [controllers.Auth, 'register'])
    router.post('login', [controllers.Auth, 'login'])
    router.delete('logout', [controllers.Auth, 'logout']).use(middleware.auth())
  })
  .as('auth')
  .prefix('/auth')

router
  .group(() => {
    router.get('profile', [controllers.Profile, 'show'])
  })
  .as('account')
  .prefix('/account')
  .use(middleware.auth())
