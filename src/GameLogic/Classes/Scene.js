import { makeObservable, observable } from "mobx";
import { nanoid } from "nanoid";

export default class Scene {
    name = "";
    id = nanoid()
    enemies = []
    heroes = []
    objects = []
    background_image;
    sceneManager;
    isBattleScene = false
    isDefeatScene = false
    isVictoryScene = false
    victory = false
    droppedItems = []
    combatStarted = false
    constructor(sceneData=null) {
        if(sceneData){
            for(let key in sceneData){
                this[key] = sceneData[key]
            }
        }
        makeObservable(this, {
            name: observable,
            enemies: observable,
            heroes: observable,
            objects: observable,
            droppedItems: observable
        })
    }
}