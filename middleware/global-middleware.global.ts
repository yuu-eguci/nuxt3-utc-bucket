// DOC: どこかに登録するのは不要。
//      global.ts という名前にすれば、自動的に呼ばれるらしい。
import { defineNuxtRouteMiddleware, abortNavigation, useNuxtApp } from '#imports'

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.params.id === '1') {
    return abortNavigation()
  }
  // NOTE: NuxtApp へアクセスできるのは、 middleware の内部らしい。
  const { $debug } = useNuxtApp()
  $debug(JSON.stringify({
    hereIs: 'middleware/global-middleware.global.ts',
    from: from.fullPath,
    to: to.fullPath
  }))
})
