import { nanoid } from 'nanoid'
import { makeObservable, observable } from 'mobx';
import DROP_TABLE from '../Constants/DROP_TABLE';

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
        },
        {
            name: "examine",
        },
    ]
    removeItem(itemToRemove) {
        let itemIndex = 0;
        this.items.forEach((item, index) => {
            if(item.id === itemToRemove.id) {
                itemIndex = index;
            }
        })
        this.items.splice(itemIndex, 1)
    }
    
    constructor(name=null, actorData=null) {
        this.name = name
        if(actorData){
            for(let key in actorData){
                this[key] = actorData[key]
            }
        }
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