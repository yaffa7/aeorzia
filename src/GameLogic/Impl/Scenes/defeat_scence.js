import Scene from "../../Classes/Scene";


export default class defeat_scene extends Scene {

    constructor(heroes) {
        super(heroes)
        this.name = "defeat_scene"

        this.SCENE_TYPE = this.SCENE_TYPE.DEFEAT_SCENE
    }
}