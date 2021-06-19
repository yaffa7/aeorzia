import Potion from '../Impl/Items/potion'
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
        this.isHero = true
        this.health = 20
        this.max_ap = 2
        this.current_ap = 2
        this.items = [new Potion()]
    }

    printStats = () => {
        return (this.strength, this.dexterity, this.constitution, this.intelligence, this.charisma)
    }
}