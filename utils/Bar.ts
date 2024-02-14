// NOTE: サンプルのための util 関数。
//       さらに、 Nuxt3 では utils は auto-import されること……
//       というか、 Foo.ts でも Bar.ts でも export Foo してたらどうなんの? という疑問……
//       ……のサンプル。こう↓出るよ。 auto-import ヤメたほうがよくね?
//       Duplicated imports "Foo", the one from "/app/utils/Bar.ts" has been ignored and "/app/utils/Foo.ts" is used
export function Foo (x: number, y: number): number {
  return x + y
}
