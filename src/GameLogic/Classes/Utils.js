export default class Utils {
    static Roll(sides) {
        return Math.floor((Math.random() * sides) + 1)
    }
}