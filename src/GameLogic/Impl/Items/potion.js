import Item from '../../Classes/Item'

export default class Potion extends Item {

    name = "Potion"
    healAmount = 10;
    description = "A potion of some kind"
    useEffect = (user, target) => {
            target.health+=this.healAmount
    }
}
