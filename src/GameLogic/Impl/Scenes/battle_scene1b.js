import { bat } from "../Enemies/bat";
import mountains from '../../../assets/Scenes/mountains.jpg'
import BattleScene from "../../Classes/BattleScene";

export default class battle_scene1b extends BattleScene {

    constructor(heroes, sceneManager) {
        super(heroes, sceneManager)
        this.name = "battle_scene1b"
        this.isBattleScene = true
        this.enemies = [
           new bat(),
           new bat(),
           new bat(),
           new bat(),
        ]
        this.background_image = mountains
    }
}