import SceneManager from './GameLogic/Controllers/SceneManager'
import { Felen } from './GameLogic/Impl/Heroes/Felen'
import { Elumbar } from './GameLogic/Impl/Heroes/Elumbar'
import { Ingos } from './GameLogic/Impl/Heroes/Ingos'
import { Varne } from './GameLogic/Impl/Heroes/Varne'

export class GameStore {
    names = ['varne', 'felen', 'elumbar', 'ingos']
    heroes = [
        new Felen(),
        new Elumbar(),
        new Ingos(),
        new Varne()
    ]
    sceneManager = new SceneManager(this.heroes)
    
    getRandomName() {
        let randIndex = Math.floor((Math.random() * this.names.length)) - 1
        return this.names.splice(randIndex, 1)[0]
    }
    getHeroes() {
        return this.heroes
    }
}

export const instance = new GameStore()
