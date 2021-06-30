import Utils from './Utils'
import { nanoid } from 'nanoid'
import { makeObservable, observable } from 'mobx';

export default class ActorBase {
    name = "";
    id = nanoid()
    description = ""
    isDead = false
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
    items = []
    max_ap = 10
    current_ap = 10
    actions = [
        {
            name: "attack",
            onExecute: (target) => {
                if (this.current_ap >= 2) {
                    this.current_ap = this.current_ap - 2
                    console.log(this.name, 'attacked!', target.name)
                    let attackRoll = Utils.Roll(20)
                    let damageRoll = Utils.Roll(this.strength)
                    if (attackRoll >= target.armor_class) {
                        console.log(this.name, 'hits! with a damage of', damageRoll)
                        target.health = target.health - damageRoll
                    } else {
                        console.log(this.name, 'missed! their target', target.name, 'with a roll of', attackRoll)
                    }
                } else { console.log(this.name, 'Not enough AP!') }
            }
        },
        {
            name: "examine",
            onExecute: (target) => {
                if (this.current_ap >= 1) {
                    this.current_ap--
                    console.log(target.description)
                } else { console.log(this.name, 'Not enough AP!') }
            }
        },
        {
            name: "Items",
            onExecute: (target) => {
                if (this.current_ap >= 1) {
                    this.current_ap--
                    console.log(this.name, "used an item action on", target.name)
                } else { console.log(this.name, 'Not enough AP!') }
            }
        }
    ]
    constructor(name) {
        this.name = name
        makeObservable(this, {
            isDead: observable,
            isHero: observable,
            isTurnActive: observable,
            strength: observable,
            dexterity: observable,
            constitution: observable,
            intelligence: observable,
            charisma: observable,
            experience: observable,
            health: observable,
            armor_class: observable,
            items: observable,
            max_ap: observable,
            current_ap: observable
        })
    }

}