import { bat } from "../Enemies/bat";
import mountains from '../../../assets/Scenes/mountains.jpg'
import BattleScene from "../../Classes/BattleScene";

export default class battle_scene1b extends BattleScene {
    name = "battle_scene1b"
    isBattleScene = true
    enemies = [
        new bat(),
        new bat(),
        new bat(),
        new bat(),
        new bat(),
        new bat(),
        new bat(),
        new bat(),
    ]
    background_image = mountains
}