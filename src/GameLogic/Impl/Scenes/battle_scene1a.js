import Scene from "../../Classes/Scene";
import { bat } from "../Enemies/bat";
import SCENE_TYPE from '../../Constants/SCENE_TYPE'
import mountains from '../../../assets/Scenes/mountains.jpg'

export default class battle_scene1a extends Scene {

    constructor(heroes) {
        super(heroes)
        this.name = "battle_scene1a"
        this.enemies = [
           new bat()
        ]
        this.background_image = mountains
        this.SCENE_TYPE = SCENE_TYPE.BATTLE_SCENE
    }
}