import Hero from './GameLogic/Classes/Hero'
import SceneManager from './GameLogic/Controllers/SceneManager'

export class GameStore {
    names = ['varne', 'felen', 'elumbar', 'ingos']
    heroes = this.getrandomHeroes()
    sceneManager = new SceneManager(this.heroes)
    getrandomHeroes() {
        return [
            new Hero(this.getRandomName()),
            new Hero(this.getRandomName()),
            new Hero(this.getRandomName()),
            new Hero(this.getRandomName())
        ]
    }
    getRandomName() {
        let randIndex = Math.floor((Math.random() * this.names.length)) - 1
        return this.names.splice(randIndex, 1)[0]
    }
    getHeroes() {
        return this.heroes
    }
}
