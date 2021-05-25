import Utils from './Utils'

export default class ActorBase {
    name;
    description = ""
    dead = false
    isHero = false
    isTurnActive = false
    strength = 10
    dexterity = 10
    constitution = 10
    intelligence = 10
    charisma = 10
    experience = 0
    health = 1
    armor_class = 10
    actions = [
        {
            name: "attack",
            onExecute:  (target) => { 
                console.log(this.name, 'attacked!', target.name)
                let attackRoll = Utils.Roll(20)
                let damageRoll = Utils.Roll(20) + this.strength
                if(attackRoll >= target.armor_class) {
                    console.log(this.name, 'hits! with a damage of', damageRoll)
                    target.health = target.health - damageRoll
                    console.log('target.health', target.health)
                }
            }
        },
        {
            name: "examine",
            onExecute: (target) => { console.log(this.name, "examined", target.name) }
        },
        {
            name: "Items",
            onExecute: (target) => { console.log(this.name, "used an item action on", target.name)}
        }
    ]
    items = []
    ap = 0
    gameInstance = null
    constructor(name) {
        this.name = name
    }
}