import SceneManager from './GameLogic/Controllers/SceneManager'
import { Felen } from './GameLogic/Impl/Heroes/Felen'
import { Elumbar } from './GameLogic/Impl/Heroes/Elumbar'
import { Ingos } from './GameLogic/Impl/Heroes/Ingos'
import { Varne } from './GameLogic/Impl/Heroes/Varne'
import { makeObservable, observable } from 'mobx'

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

export const instance = new GameStore()
