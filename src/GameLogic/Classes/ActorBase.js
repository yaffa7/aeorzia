import Utils from './Utils'
import { nanoid } from 'nanoid'
import { makeObservable, observable } from 'mobx';
import DROP_TABLE from '../Constants/DROP_TABLE';
import DAMAGE_TYPE from '../Constants/DAMAGE_TYPE';

export default class ActorBase {
    name = "";
    image = null
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
    DROP_TABLE = DROP_TABLE.NONE
    actions = [
        {
            name: "attack",
            onExecute: (target) => {
                if (this.current_ap >= 2) {
                    this.current_ap = this.current_ap - 2
                    Utils.log(`${this.name} attacked! ${target.name}`)
                    let attackRoll = Utils.Roll(20)
                    let damageRoll = Utils.Roll(this.strength)
                    if (attackRoll >= target.armor_class) {
                        Utils.log(`${this.name} hits! with a damage of ${damageRoll}`)
                        target.health = target.health - damageRoll
                    } else {
                        Utils.log(this.name + ' missed! their target ' + target.name + ' with a roll of ' + attackRoll)
                    }
                } else { Utils.log(this.name + ' Not enough AP!') }
            }
        },
        {
            name: "examine",
            onExecute: (target) => {
                if (this.current_ap >= 1) {
                    this.current_ap--
                } else { Utils.log(this.name + ' Not enough AP!') }
            }
        },
        {
            name: "Items",
            onExecute: (target) => {
                if (this.current_ap >= 1) {
                    this.current_ap--
                    Utils.log(`${this.name} used an item action on ${target.name}`)
                } else { Utils.log(this.name +  ' Not enough AP!') }
            }
        }
    ]
    onSkillUsedOn = (skill, user) => {
        // this is called when a skill is used on a target
        // the follwing runs from the context of the actor being targeted
        if(user.current_ap >= skill.apCost) {
            Utils.log(`${user.name} used ${skill.skillName} on ${this.name}`)
            user.current_ap-=skill.apCost
            let damage = Utils.RollFromString(skill.damageRoll)
            if(skill.damageType === DAMAGE_TYPE.HEALING) {
                damage=-damage
            }
            Utils.log(`${user.name} Rolled for (${skill.damageRoll})  [${damage} ${skill.damageType}]`)
            this.health-=damage
        }
    }
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