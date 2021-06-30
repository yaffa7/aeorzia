import { makeObservable, observable } from "mobx";

export default class Scene {
    name = "";
    enemies = []
    heroes = []
    objects = []
    background_image;
    active_actor;
    active_index = 0
    sceneManager;
    isBattleScene = false
    isDefeatScene = false
    constructor() {
        makeObservable(this, {
            name: observable,
            enemies: observable,
            heroes: observable,
            objects: observable
        })
    }
}