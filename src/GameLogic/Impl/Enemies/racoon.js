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
    image = "https://i0.wp.com/newspack-washingtoncitypaper.s3.amazonaws.com/uploads/2010/03/blogs_citydesk_files_2010_03_3237211012_3ae761995f_o.png?fit=1200%2C944&ssl=1"
    skills = [
        Scratch
    ]
}