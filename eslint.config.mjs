// NOTE: ESLint 9 以降の flat config。
//       @nuxt/eslint モジュールが nuxt.config.ts の設定から .nuxt/eslint.config.mjs を生成してくれるので、
//       ここではそれを読み込むだけ。 (yarn install の postinstall = nuxt prepare で生成される)
//       https://eslint.nuxt.com/packages/module
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // NOTE: プロジェクト独自のルールを足したいときはここに書く。
)
