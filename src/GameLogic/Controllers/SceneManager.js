import defeat_scene from "../Impl/Scenes/defeat_scence";


export default class SceneManager {

    scenes = []
    current_scene;
    next_scene;
    prev_scene;
    constructor(scences) {
        this.scenes = scences
        if (scences[0] != null)
            this.current_scene = scences[0]
        if (scences[1] != null)
            this.next_scene = scences[1]
    }

    loadNextScene(){
        let curIndex = this.scenes.indexOf(this.current_scene)
        this.prev_scene = this.current_scene
        this.current_scene = this.scenes[curIndex + 1]
        this.next_scene = this.scenes[curIndex + 2]
    }

    changeScene(scene) {
        this.current_scene = scene
    }

    Defeat() {
        this.current_scene = new defeat_scene()
    }
}