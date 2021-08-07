// Uses the export default keywords to specify the default module binding
export default class Ninja {
  constructor(name) {
    this.name = name;
  }
}

// We can still use named exports along with the default export
export function compareSamurai(samurai1, samurai2) {
  return samurai1.name === samurai2.name;
}
