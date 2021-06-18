export default class Utils {

    add_delay = 500

    static Roll(sides) {
        return Math.floor((Math.random() * sides) + 1)
    }

    static PrintDelayed(func) {
        window.delay+=this.add_delay
        setTimeout(() => func(), window.delay)
    }
}