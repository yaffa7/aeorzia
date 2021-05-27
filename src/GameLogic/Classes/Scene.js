import SCENE_TYPE from '../Constants/SCENE_TYPE'
import Utils from './Utils';

export default class Scene {
    name;
    enemies = []
    heroes = []
    objects = []
    background_image;
    SCENE_TYPE;
    active_actor;
    active_index = 0
    setStateCallback;
    constructor(heroes) {
        this.heroes = heroes
    }

    // Only returns alive heroes
    getActorsByInitiative() {
        return this.heroes.concat(this.enemies)
                            .sort(function(a,b) { return a.dexterity < b.dexterity })
                            .filter(e => !e.isDead)
    }

    getActiveActor() {
        return this.getActorsByInitiative()[this.active_index]
    }

    enemiesDead() {
        let allDead = true
        this.enemies.forEach((e) => {
            if(e.isDead === false) {
                allDead = false
            }
        })
        return allDead
    }

    nextTurn() {
        // Death check
        this.getActorsByInitiative().forEach(a => {
            if(a.health <= 0) {
                a.isDead = true
            }
        })
        // Victory check
        if(this.enemiesDead()) {
            console.log('Victory!')
        }
        this.active_index++
        if(this.active_index > this.getActorsByInitiative().length - 1) {
            this.active_index = 0
        }
        // set active turn
        this.getActorsByInitiative().map((actor) => actor.isTurnActive = actor.name === this.getActiveActor().name ? true : false)
        if(!this.getActiveActor().isHero) {
            this.startEnemyTurn()
        } else {
            // reset ap
        this.heroes.map((hero) => hero.current_ap = hero.max_ap)
        }
    }

    startCombat() {
        if(this.SCENE_TYPE === SCENE_TYPE.BATTLE_SCENE) {
            console.log('combat started!', this.getActorsByInitiative())
            // Determine highest initiative in scene
            console.log('Highest Initiative was:', this.getActiveActor().name, 'with an initiative of', this.getActiveActor().dexterity )
            if(this.getActiveActor().isHero) {
                this.startHeroTurn()
            } else {
                this.startEnemyTurn()
            }
        }
    }

    startHeroTurn() {
        console.log('Hero turn started!')
        // set active turn
        this.getActorsByInitiative().map((actor) => actor.isTurnActive = actor.name === this.getActiveActor().name ? true : false)
    }

    startEnemyTurn() {
        console.log('Enemy turn started!')
        let enemy = this.getActiveActor()
        // select hero target at random
        let targetIndex = Utils.Roll(this.heroes.filter(h => !h.isDead).length - 1)
        enemy.actions.forEach(action => {
            if(action.name === 'attack') {
                action.onExecute(this.heroes.filter(h => !h.isDead)[targetIndex])
            }
        });
        this.setStateCallback()
        this.nextTurn()
    }
}