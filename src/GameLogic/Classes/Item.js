// items are objects that can be used in battle
export default class Item {
    constructor() {
        this.name = ""
        this.description = ""
        this.onUse = (user, target) => {
            console.log(this.user, 'used', this.name, 'on', this.target)
        }
        this.value = 0
    }
}