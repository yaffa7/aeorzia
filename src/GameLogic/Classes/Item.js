import { nanoid } from "nanoid"
import Utils from "./Utils"

// items are objects that can be used in battle
export default class Item {
    constructor() {
        this.name = ""
        this.description = ""
        this.onUse = (user, target) => {
            Utils.log(`${user.name} used ${this.name} on ${target.name}`)
            this.useEffect(user,target)
        }
        this.useEffect = (user, target) => {

        }
        this.value = 0
        this.id = nanoid()
    }
}