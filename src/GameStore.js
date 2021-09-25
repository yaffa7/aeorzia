import SceneManager from './GameLogic/Controllers/SceneManager'
import { Felen } from './GameLogic/Impl/Heroes/Felen'
import { Elumbar } from './GameLogic/Impl/Heroes/Elumbar'
import { Ingos } from './GameLogic/Impl/Heroes/Ingos'
import { Varne } from './GameLogic/Impl/Heroes/Varne'
import { makeObservable, observable, reaction } from 'mobx'
import React from 'react'
import { render } from 'react-dom'
import {MOB_TO_CLASS} from './GameLogic/Constants/MOB_TABLE';

window.React = React

export class GameStore {
    names = ['varne', 'felen', 'elumbar', 'ingos']
    combat_log = []
    heroes = [
        new Felen(),
        new Elumbar(),
        new Ingos(),
        new Varne()
    ]
    sceneManager = new SceneManager(this.heroes)
    partyGold = 0
    getRandomName() {
        let randIndex = Math.floor((Math.random() * this.names.length)) - 1
        return this.names.splice(randIndex, 1)[0]
    }
    getHeroes() {
        return this.heroes
    }
    constructor() {

        makeObservable(this, {
            partyGold: observable,
            combat_log: observable
        })
    }
}

let newInstance = new GameStore()
const oldInstance = localStorage.getItem("gameStore")
if(oldInstance){
    newInstance = JSON.parse(oldInstance)
    newInstance.sceneManager = new SceneManager(newInstance.heroes, newInstance.sceneManager)
    newInstance.heroes = newInstance.sceneManager.current_scene.heroes
    let newScenes
    newScenes = newInstance.sceneManager.scenes.map((scene) => {
        scene.enemies = scene.enemies.map((enemy) => {
            const enemyClass = MOB_TO_CLASS[enemy.name]
            enemy = new enemyClass(null,enemy)
            return enemy
        })
        return scene
    });
    let curSceneEnemies = newInstance.sceneManager.current_scene.enemies
    curSceneEnemies = curSceneEnemies.map((enemy) => {
        const enemyClass = MOB_TO_CLASS[enemy.name]
        enemy = new enemyClass(null,enemy)
        return enemy
    })
    newInstance.sceneManager.current_scene.enemies = curSceneEnemies
    newInstance.sceneManager.scenes = newScenes
}
export const instance = newInstance
reaction(() => {
    localStorage.setItem("gameStore",JSON.stringify(instance))
    return instance
}, ()=>{
})