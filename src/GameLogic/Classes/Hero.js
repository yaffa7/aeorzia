export default class Hero {

    constructor(name) {
        this.name = name
        this.strength = this.Roll(15)
        this.dexterity = this.Roll(15)
        this.constitution = this.Roll(15)
        this.intelligence = this.Roll(15)
        this.charisma = this.Roll(15)
    }

    printStats = () => {
        return (this.strength, this.dexterity, this.constitution, this.intelligence, this.charisma)
    }

    Roll = (sides) => {
        return Math.floor((Math.random() * sides) + 1)
    }
}