import battle_scene1a from '../Impl/Scenes/battle_scene1a'
import battle_scene1b from '../Impl/Scenes/battle_scene1b'

export default class SceneManager {

    scenes = []
    current_scene;
    next_scene;
    prev_scene;
    loading = null;
    doneLoading = null;
    constructor() {
        this.scenes = [new battle_scene1a(), new battle_scene1b()]
        this.current_scene = this.scenes[0]
    }

    loadNextScene(){
        this.loading()
        let curIndex = this.scenes.indexOf(this.current_scene)
        this.prev_scene = this.current_scene
        this.current_scene = this.scenes[curIndex + 1]
        this.next_scene = this.scenes[curIndex + 2]

        this.current_scene.heroes = this.prev_scene.heroes
        this.doneLoading()
    }

    changeScene(scene) {
        let current_heroes = this.current_scene.heroes
        this.loading()
        scene.heroes = current_heroes
        this.current_scene = scene
        this.doneLoading()
    }

}