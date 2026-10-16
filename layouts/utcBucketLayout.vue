<script setup lang="ts">
// NOTE: runtimeConfig.public はクライアント側でも読める。 (nuxt.config.ts の runtimeConfig 参照)
const { public: { appVersion } } = useRuntimeConfig()
</script>

<template>
  <v-app>
    <!--
      https://vuetifyjs.com/en/api/v-app/
      https://vuetifyjs.com/en/features/theme/
      NOTE: dark テーマは nuxt.config.ts の vuetifyOptions.theme.defaultTheme で設定している。
      NOTE: template 直下 (v-app の外) にコメントを置くと vue/no-multiple-template-root に怒られるので中に書く。
    -->
    <!--
      https://vuetifyjs.com/en/api/v-app-bar/
    -->
    <v-app-bar>
      <template #prepend>
        <v-icon
          color="success"
          icon="mdi-pail-outline"
          size="large"
        />
      </template>
      <!-- https://vuetifyjs.com/en/api/v-app-bar-title/ -->
      <v-app-bar-title>Nuxt3 UTC Bucket</v-app-bar-title>
      <!--
        NOTE: v-btn の to は NuxtLink として扱われ、 app.baseURL (GitHub Pages では /nuxt3-utc-bucket/) が付く。
              https://nuxt.com/docs/api/components/nuxt-link
      -->
      <v-btn
        to="/sample"
        variant="text"
      >
        Sample
      </v-btn>
    </v-app-bar>
    <slot />
    <!--
      https://vuetifyjs.com/en/api/v-footer/
      - app false: ページ最下部
    -->
    <v-footer
      :app="false"
    >
      <span>
        &copy; {{ new Date().getFullYear() }}
        <span
          class="text-caption ml-2"
          data-testid="app-version"
        >{{ appVersion }}</span>
      </span>
      <v-spacer />
      <a
        href="https://github.com/yuu-eguci/nuxt3-utc-bucket"
        aria-label="GitHub repository"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon
          icon="mdi-github"
          size="large"
        />
      </a>
    </v-footer>
  </v-app>
</template>
