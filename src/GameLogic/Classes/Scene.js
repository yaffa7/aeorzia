import { makeObservable, observable } from "mobx";

export default class Scene {
    name = "";
    enemies = []
    heroes = []
    objects = []
    background_image;
    sceneManager;
    isBattleScene = false
    isDefeatScene = false
    isVictoryScene = false
    victory = false
    constructor() {
        makeObservable(this, {
            name: observable,
            enemies: observable,
            heroes: observable,
            objects: observable
        })
    }
}