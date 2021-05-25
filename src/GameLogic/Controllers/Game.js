import Hero from '../Classes/Hero'
import battle_scene1a from '../Impl/Scenes/battle_scene1a'
import SceneManager from './SceneManager'

class Game {
    constructor() {
        this.names = ['varne', 'felen', 'elumbar', 'ingos']
        this.heroes = this.getrandomHeroes()
        // this.mapReferences(this)
        this.sceneManager = new SceneManager(
            [new battle_scene1a(this.heroes)]
        )
        
    }

    
    mapReferences(instance) {
        this.heroes.forEach((hero) => {
            hero.gameInstance = instance
        })
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