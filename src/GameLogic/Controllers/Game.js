import Hero from '../Classes/Hero'
import SceneManager from './SceneManager'

class Game {
    constructor() {
        window.game = this
        this.names = ['varne', 'felen', 'elumbar', 'ingos']
        this.heroes = this.getrandomHeroes()
        this.sceneManager = new SceneManager()
    }

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

export default Game