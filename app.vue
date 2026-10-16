<script setup lang="ts">
// NOTE: 選択中の i18n ロケールを <html lang> に反映する。
//       https://i18n.nuxtjs.org/docs/guide/seo
const head = useLocaleHead()
useHead({
  htmlAttrs: {
    lang: computed(() => head.value.htmlAttrs?.lang ?? 'en'),
  },
})
</script>

<template>
  <div>
    <!--
      NOTE: layouts 機能をフルで使う設定。
            app.vue + NuxtLayout; layouts; pages + definePageMeta
    -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
