import ActorBase from "../../Classes/ActorBase";

export class bat extends ActorBase {

    constructor() {
        super()
        this.name = 'bat'
        this.description = "A furry bat"
        this.health = 15
        this.dexterity = 10
        this.strength = 1

    }
}