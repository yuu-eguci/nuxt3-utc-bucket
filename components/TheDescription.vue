DOC: https://nuxt.com/docs/guide/directory-structure/components
     components ディレクトリ内のコンポーネントは autoImport の対象。

<template>
  <v-card
    class="mt-4"
  >
    <v-card-title class="headline">
      Nuxt UTC Bucket
    </v-card-title>
    <v-card-text>
      {{ $t('UTC を打てば JST にするし、 JST を打てば UTC にするぞ。') }}
    </v-card-text>
    <v-card-text>
      {{ $t('複数行のほうでは、空欄の行はそのまま空欄で出力するよ。') }}
      {{ $t('あと、5行以降は省略してるけど、コピーはできるよ。') }}
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="secondary"
        :disabled="$i18n.locale === 'en'"
        @click="$i18n.setLocale('en')"
      >
        {{ $t('English') }}
      </v-btn>
      <v-btn
        color="secondary"
        :disabled="$i18n.locale === 'ja'"
        @click="$i18n.setLocale('ja')"
      >
        {{ $t('日本語でおｋ') }}
      </v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="secondary"
        @click="showBucketFunction"
      >
        <v-icon
          class="mr-2"
        >
          mdi-pail-outline
        </v-icon>
        {{ $t('バケツをまた開ける') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
