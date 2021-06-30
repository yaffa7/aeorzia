import { makeAutoObservable, makeObservable, observable } from 'mobx'
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
    constructor() {
     makeObservable(this, {
        heroes: observable,
     })
    }
    setHeroDeadStatus(heroid, isDead) {
        this.heroes.find(h => h.id === heroid).isDead = isDead
    }
    getRandomName() {
        let randIndex = Math.floor((Math.random() * this.names.length)) - 1
        return this.names.splice(randIndex, 1)[0]
    }
    getHeroes() {
        return this.heroes
    }
}

export const instance = new GameStore()
