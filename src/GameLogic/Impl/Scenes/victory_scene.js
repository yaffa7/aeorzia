import Scene from "../../Classes/Scene";

export default class victory_scene extends Scene {

    constructor(heroes) {
        super(heroes)
        this.name = "victory_scene"
        this.isVictoryScene = true
        this.enemies = []
    }
}