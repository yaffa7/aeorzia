import ActorBase from './ActorBase'
import Utils from './Utils'

export default class Hero extends ActorBase {

    constructor(name) {
        super(name)
        this.name = name
        this.strength += Utils.Roll(5)
        this.dexterity += Utils.Roll(5)
        this.constitution += Utils.Roll(5)
        this.intelligence += Utils.Roll(5)
        this.charisma = Utils.Roll(15)
    }

    printStats = () => {
        return (this.strength, this.dexterity, this.constitution, this.intelligence, this.charisma)
    }
}