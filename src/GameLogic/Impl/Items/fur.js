import Item from '../../Classes/Item'
import Utils from '../../Classes/Utils'

export default class Fur extends Item {

    name = "Fur"
    description = "A potion of some kind"
    onUse = (user, target) => {
        Utils.log(`${user.name} threw the ${this.name} at  ${target.name}`)
    }
}
