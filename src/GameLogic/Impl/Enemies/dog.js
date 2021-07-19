import ActorBase from "../../Classes/ActorBase";
import DROP_TABLE from "../../Constants/DROP_TABLE";
import { Bite } from "../Skills";

export class dog extends ActorBase {
    name = 'dog'
    description = "A furry dog"
    health = 10
    dexterity = 10
    strength = 5
    armor_class = 4
    DROP_TABLE = DROP_TABLE.SMALL_CREATURE
    skills = [
        Bite
    ]
}