<script setup lang="ts">
  const variants = ['elevated', 'flat', 'tonal', 'outlined']
  const { $debug } = useNuxtApp()
  $debug({variants})
  // auto-import が utils/Foo が読んだ。
  $debug(new Foo('a', 'b'))
  // 手動で utils/Bar を読んだ。
  import { Foo } from './utils/Bar'
  $debug(Foo(1, 2))
  // ……いやこわっ!! auto-import こわっ!!
</script>

<template>
  <div>
    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          v-for="(variant, i) in variants"
          :key="i"
          cols="auto"
        >
          <v-card
            class="mx-auto"
            max-width="344"
            :variant="variant"
          >
            <v-card-item>
              <div>
                <div class="text-overline mb-1">
                  {{ variant }}
                </div>
                <div class="text-h6 mb-1">
                  Headline
                </div>
                <div class="text-caption">
                  Greyhound divisely hello coldly fonwderfully
                </div>
              </div>
            </v-card-item>

            <v-card-actions>
              <v-btn>
                Button
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <NuxtWelcome />
  </div>
</template>
