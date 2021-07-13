import ActorBase from "../../Classes/ActorBase";
import DROP_TABLE from "../../Constants/DROP_TABLE";

export class bat extends ActorBase {
    name = 'bat'
    description = "A furry bat"
    health = 15
    dexterity = 10
    strength = 5
    armor_class = 3
    DROP_TABLE = DROP_TABLE.SMALL_CREATURE
}