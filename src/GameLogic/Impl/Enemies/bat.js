import ActorBase from "../../Classes/ActorBase";
import DROP_TABLE from "../../Constants/DROP_TABLE";
import { Bite } from "../Skills";

export class bat extends ActorBase {
    name = 'bat'
    description = "A furry bat"
    health = 5
    dexterity = 10
    strength = 5
    armor_class = 1
    DROP_TABLE = DROP_TABLE.SMALL_CREATURE
    skills = [
        Bite
    ]
}