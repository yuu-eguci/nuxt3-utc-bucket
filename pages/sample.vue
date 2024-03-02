DOC: layout/sample.vue と pages/sample.vue はノートです。
     作るときの参考。消さずにとっておく。

DOC: pages という機能。
     ページを利用するには、 pages/index.vue ファイルを作成し、 <NuxtPage /> コンポーネントを app.vue に追加する。
     ただ、 app.vue は無くてもいい。その場合、 index.vue が勝手にトップページになる。

<script setup lang="ts">
const { $debug } = useNuxtApp()

// NOTE: この component の layout とかを設定するやつ。
definePageMeta({
  layout: 'sample-layout',
})

// NOTE: Nuxt2 の props は、 Nuxt3 ではこう書けばいい。
const props = defineProps({
  myProp: {
    type: String,
    required: false,
    default: 'defaultValue',
  }
})
$debug('Sample page の props', props)

// NOTE: Nuxt3 において子->親の値更新はふた通りあるみたい。
//       1. emit
//         親でこうして↓
//         const handleUpdateMyProp = (newValue) => { myProp.value = newValue }
//         <ChildComponent @update:myProp="handleUpdateMyProp" />
//         子でこうする↓
//         emit('update:myProp', newValue)
//         ===
//         v-model の場合親でこうして↓
//         <ChildComponent v-model="myProp" />
//        子でこうする↓
//        emit('update:modelValue', newValue)
//         評価: Vue の推奨するパターン。イベント名を管理する必要があって保守性が低い。
//       2. props で関数を渡す
//         親でこうして↓
//         const handleUpdateMyProp = (newValue) => { myProp.value = newValue }
//         <ChildComponent :handleUpdateMyProp="handleUpdateMyProp" />
//         子でこうする↓
//         defineProps({ handleUpdateMyProp: { type: Function } })
//         props.handleUpdateMyProp(newValue)
//         評価: わかりやすい。意図も明確。でも、あんまりそんな経験はないけど、子コンポーネントの再利用性が下がる。
//       両者に機能的な差はないので、普段はわかりやすい props のほうを使って、 v-model を作りたいときは emit を使えばいいと思う。

// NOTE: Nuxt2 の data は、 Nuxt3 では、
//       プリミティブな値であれば ref を使って、
//       (ref は template ではそのまま渡せて、 setup の中で .value でアクセスする)
//       オブジェクトであれば reactive を使う。
const myData = ref('初期値')
const myObject = reactive({
  count: 0,
  text: 'こんにちは'
})
$debug('Sample page の data', myData.value, myObject)

// NOTE: Vue が追跡することが不要な変数は、普通に定義すればいい。
const variants: Array<NonNullable<'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'> | undefined>
  = ['elevated', 'flat', 'tonal', 'outlined']

// NOTE: Nuxt2 の created は、 Nuxt3 では、ここに書けばいい。
$debug('Sample page の created のタイミング!')

// NOTE: Nuxt2 の mounted は、 Nuxt3 では、ここに書けばいい。
onMounted(() => {
  $debug('Sample page の mounted のタイミング!')
})

// NOTE: Nuxt2 の methods は、 Nuxt3 では、ここに書けばいい。
const myMethod = () => {
  // ここでは ref と reactive の値を更新するテストをしてみる。
  myData.value = '更新された値'
  myObject.count += 1
  myObject.text = 'こんばんは'
  $debug('Sample page の method が呼ばれた!')
  $debug(myData.value, myObject)
}

// NOTE: @nuxtjs/i18n 公式ページのまま。
//       https://i18n.nuxtjs.org/docs/getting-started/usage
const { locale } = useI18n()
</script>

<template>
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
            <v-btn
              @click="myMethod"
            >
              Button
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-card-item>
            <form>
              <select v-model="locale">
                <option value="en">
                  en
                </option>
                <option value="ja">
                  ja
                </option>
              </select>
              <p>{{ $t('welcome') }}</p>
            </form>
          </v-card-item>

          <v-card-actions>
            <v-btn
              @click="myMethod"
            >
              Button
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
