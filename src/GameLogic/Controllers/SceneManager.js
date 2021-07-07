import { action, makeObservable, observable } from 'mobx';
import battle_scene1a from '../Impl/Scenes/battle_scene1a'

export default class SceneManager {

    scenes = []
    current_scene = new battle_scene1a()
    next_scene;
    prev_scene;
    constructor(heroes) {
        makeObservable(this, {
            current_scene: observable,
        })
        this.current_scene.heroes = heroes
    }

    loadNextScene(){
        let curIndex = this.scenes.indexOf(this.current_scene)
        this.prev_scene = this.current_scene
        this.current_scene = this.scenes[curIndex + 1]
        this.next_scene = this.scenes[curIndex + 2]
    }

    changeScene(scene) {
        let current_heroes = this.current_scene.heroes
        scene.heroes = current_heroes
        this.current_scene = scene
    }

}