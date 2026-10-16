<!--
DOC: layouts という機能。
     https://nuxt.com/docs/guide/directory-structure/layouts
     app.vue, layouts, pages が関わっていて、しかもどちらかを使わないこともできるからややこしい。
     - フル使用: app.vue + NuxtLayout; layouts; pages + definePageMeta -> layouts を動的に使える
     - Layout はワンパターンでいいんだけど1: app.vue + pages -> app.vue が default layout みたいなもん
     - Layout はワンパターンでいいんだけど2: default layout + pages -> app.vue なくてもいいの?!
       -> なくていい。 pages/ があれば Nuxt が <NuxtLayout><NuxtPage /></NuxtLayout> 相当の app を用意してくれる。
          https://nuxt.com/docs/guide/directory-structure/app
-->

<template>
  <div>
    <SampleHeader>
      App header (sample layout)
    </SampleHeader>
    <slot />
    <div>
      App footer (sample layout)
      <!-- NOTE: NuxtLink はクライアント側で遷移する (フルリロードしない) ので、 middleware のログが console に出るのを確認できる。 -->
      <NuxtLink to="/">
        トップへ戻る
      </NuxtLink>
    </div>
  </div>
</template>
