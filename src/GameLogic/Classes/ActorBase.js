export default class ActorBase {
    description = ""
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
            onExecute:  (target) => { console.log(this.name, 'attacked! ', target)}
        },
        {
            name: "examine",
            onExecute: (target) => { console.log(this.name, "examined ", target.name) }
        },
        {
            name: "Items",
            onExecute: (target) => { console.log(this.name, "used an item action")}
        }
    ]
    items = []
    ap = 0
    gameInstance = null
    constructor(name) {
        this.name = name
    }
}