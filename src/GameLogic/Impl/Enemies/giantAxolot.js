import ActorBase from "../../Classes/ActorBase";
import DROP_TABLE from "../../Constants/DROP_TABLE";
import { Bite } from "../Skills";

export class giantAxolot extends ActorBase {
    name = 'giantAxolot'
    description = "A giant axolot"
    health = 20
    dexterity = 20
    strength = 8
    armor_class = 1
    DROP_TABLE = DROP_TABLE.SMALL_CREATURE
    image = "https://www.thoughtco.com/thmb/_P6f3X8CDDD7qYZl6rp1vyV2_io=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/axolotl--ambystoma-mexicanum--in-front-of-a-white-background-508416596-5ac3af298023b900367ff043.jpg"
    skills = [
        Bite
    ]
}