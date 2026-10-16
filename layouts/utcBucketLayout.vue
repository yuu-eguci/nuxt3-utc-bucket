<template>
  <v-app theme="dark">
    <!--
      https://vuetifyjs.com/en/api/v-app/
      https://vuetifyjs.com/en/features/theme/
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
