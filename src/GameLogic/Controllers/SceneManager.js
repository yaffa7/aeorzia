

export default class SceneManager {

    scenes = []
    current_scene;
    next_scene;
    prev_scene;
    constructor(scences) {
        this.scenes = scences
        this.current_scene = scences[0]
        this.next_scene = scences[1]
    }

    loadNextScene(){
        curIndex = this.scenes.indexOf(this.current_scene)
        this.prev_scene = this.current_scene
        this.current_scene = this.scenes[curIndex + 1]
        this.next_scene = this.scenes[curIndex + 2]
    }
}