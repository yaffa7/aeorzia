
export default class SceneManager {

    scenes = []
    current_scene;
    next_scene;
    prev_scene;
    loading = null;
    doneLoading = null;
    constructor(scenes = []) {
        this.scenes = scenes
        this.current_scene = scenes[0]
    }

    loadNextScene(){
        let curIndex = this.scenes.indexOf(this.current_scene)
        this.prev_scene = this.current_scene
        this.current_scene = this.scenes[curIndex + 1]
        this.next_scene = this.scenes[curIndex + 2]
    }

    changeScene(scene) {
        let current_heroes = this.current_scene.heroes
        this.loading()
        scene.heroes = current_heroes
        this.current_scene = scene
        this.doneLoading()
    }

}