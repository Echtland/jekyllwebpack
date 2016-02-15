import styles from './assets/styles/index.scss'

class Person  {
  constructor(name, bar) {
    this.styles = styles || undefined
    this.name = name
    this.foo = bar
  }

  say() {
    console.log(this.name)
    console.log(this.foo())
    return this.name
  }

  setStyle() {
    // debugger
    // $('.delete-me').addClass(this.styles.hias)
  }
}

const hiasl = new Person('Hias', () => {
  return 'Hallooooooooooooooo!'
})
hiasl.say()
hiasl.setStyle()
// console.log(hiasl.styles.hias)
