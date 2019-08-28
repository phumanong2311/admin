export default class Config {
  constructor (type) {
    this.type = type
  }

  get () {
    switch (this.type) {
      case 'df':
      default:
        return {
          headers: { 'Content-Type': 'application/json' }
        }
    }
  }
}
