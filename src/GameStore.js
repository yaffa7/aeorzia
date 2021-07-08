import Hero from './GameLogic/Classes/Hero'
import SceneManager from './GameLogic/Controllers/SceneManager'

export class GameStore {
    names = ['varne', 'felen', 'elumbar', 'ingos']
    heroes = [
        new Hero(this.getRandomName()),
        new Hero(this.getRandomName()),
        new Hero(this.getRandomName()),
        new Hero(this.getRandomName())
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
