import battle_scene1a from '../Impl/Scenes/battle_scene1a'
import battle_scene1b from '../Impl/Scenes/battle_scene1b'
import victory_scene from '../Impl/Scenes/victory_scene';

export default class SceneManager {
    scenes = []
    current_scene;
    next_scene;
    prev_scene;

    setStateCallbacks = [];
    constructor() {
        this.scenes = [new battle_scene1a(), new battle_scene1b()]
        this.current_scene = this.scenes[0]
    }

    loadNextScene(){
        let curIndex = this.scenes.indexOf(this.current_scene)
        this.prev_scene = this.current_scene
        this.current_scene = this.scenes[curIndex + 1]
        if (this.current_scene == undefined) {
            this.current_scene = new victory_scene()
        }
        this.next_scene = this.scenes[curIndex + 2]

        this.current_scene.heroes = this.prev_scene.heroes
        this.invokeCallbacks()
        this.current_scene.startCombat()
    }

    changeScene(scene) {
        let current_heroes = this.current_scene.heroes
        scene.heroes = current_heroes
        this.current_scene = scene
        this.invokeCallbacks()
    }

    // if called from react component, then component will recieve state updates
    registerCallback(callback) {
        this.setStateCallbacks.push(callback)
    }

    invokeCallbacks() {
        this.setStateCallbacks.forEach(cb =>  {
            cb()   
        });
    }

}