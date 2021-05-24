import Hero from '../Classes/Hero'

class Game {
    constructor() {
        this.names = ['varne', 'felen', 'elumbar', 'ingos']
        this.heroes = this.getrandomHeroes()
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
            return this.names.splice(randIndex, 1)
    }

    getHeroes() {
        return this.heroes
    }

}

export default Game