import { makeObservable, observable } from 'mobx';
import { instance } from '../../GameStore'
import victory_scene from '../Impl/Scenes/victory_scene';
import BattleGenerator from '../Classes/BattleGenerator';
import BattleScene from '../Classes/BattleScene'
export default class SceneManager {
    scenes = BattleGenerator.GenerateBattles('ZONE_1', 5)
    current_scene = "";
    getCurrentIndex() {
        return this.scenes.indexOf(this.current_scene)
    }
    constructor(heroes, sceneManager=null) {
        makeObservable(this, {
            current_scene: observable,
        })
        if(sceneManager){
            this.scenes = sceneManager.scenes
            let curScene
            if(sceneManager.current_scene.isBattleScene){
                curScene = new BattleScene(sceneManager.current_scene)
            }
            console.log("check cur scene", curScene)
            this.current_scene = curScene
        }else{
            this.current_scene = this.scenes[0] 
        }
        console.log("scane manager", this)
        this.current_scene.heroes = heroes
    }

    loadNextScene(){
        let curIndex = this.getCurrentIndex()

        this.current_scene = null
        this.current_scene = this.scenes[curIndex + 1]
        if(this.current_scene == null) {
            this.current_scene = new victory_scene()
        } else {
            this.current_scene.heroes = instance.heroes
            this.current_scene.startCombat()
        }
    }

    changeScene(scene) {
        let current_heroes = this.current_scene.heroes
        scene.heroes = current_heroes
        this.current_scene = scene
    }

}