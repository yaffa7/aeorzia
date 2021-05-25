import SCENE_TYPE from '../Constants/SCENE_TYPE'

export default class Scene {
    name;
    enemies = []
    heroes = []
    objects = []
    background_image;
    SCENE_TYPE;
    constructor(heroes) {
        this.heroes = heroes
    }

    getActors() {
        return this.heroes.concat(this.enemies)
    }

    startCombat() {
        if(this.SCENE_TYPE === SCENE_TYPE.BATTLE_SCENE) {
            console.log('combat started!', this.getActors())
            // Determine highest initiative in scene
            let actorsByInitiaive = this.getActors().sort(function(a,b) {
                return a.dexterity < b.dexterity
            })
            let startingActor = actorsByInitiaive[0]
            console.log('Highest Initiative was:', startingActor.name, 'with an initiative of', startingActor.dexterity )
            if(startingActor.isHero) {
                this.startHeroTurn(actorsByInitiaive)
            } else {
                this.startEnemyTurn(actorsByInitiaive)
            }
        }
    }

    startHeroTurn(actorsByInitiaive) {
        console.log('Hero turn started!')
        // set active turn
        actorsByInitiaive.map((actor) => actor.isTurnActive = actor.name === actorsByInitiaive[0].name ? true : false)
    }

    startEnemyTurn(actorsByInitiaive) {
        console.log('Enemy turn started!')
    }
}