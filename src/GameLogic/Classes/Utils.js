export default class Utils {

    add_delay = 500

    static Roll(sides) {
        return Math.floor((Math.random() * sides) + 1)
    }

    static RollFromString(rollString) {
        let totalDamage = 0
        let numDice = rollString.split('d')[0]
        let sides = rollString.split('d')[1]
        for(let i = 0;i<numDice;i++) {
            totalDamage+=this.Roll(sides)
        }
        return totalDamage
    }
}