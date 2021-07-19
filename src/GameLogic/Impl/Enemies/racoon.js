import ActorBase from "../../Classes/ActorBase";
import DROP_TABLE from "../../Constants/DROP_TABLE";
import { Scratch } from "../Skills";

export class racoon extends ActorBase {
    name = 'racoon'
    description = "A furry racoon"
    health = 5
    dexterity = 10
    strength = 5
    armor_class = 1
    DROP_TABLE = DROP_TABLE.SMALL_CREATURE
    skills = [
        Scratch
    ]
}