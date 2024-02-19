DOC: layouts という機能。
     app.vue, layouts, pages が関わっていて、しかもどちらかを使わないこともできるからややこしい。
     - フル使用: app.vue + NuxtLayout; layouts; pages + definePageMeta -> layouts を動的に使える
     - Layout はワンパターンでいいんだけど1: app.vue + pages -> app.vue が default layout みたいなもん
     - Layout はワンパターンでいいんだけど2: default layout + pages -> app.vue なくてもいいの?!

<template>
  <div>
    <div>
      App header (sample layout)
    </div>
    <slot />
    <div>
      App footer (sample layout)
    </div>
  </div>
</template>
