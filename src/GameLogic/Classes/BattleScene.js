import { instance } from "../../GameStore";
import defeat_scene from "../Impl/Scenes/defeat_scene";
import Scene from "./Scene";
import Utils from './Utils'


export default class BattleScene extends Scene {


    // Only returns alive heroes
    getActorsByInitiative() {
        return this.heroes.concat(this.enemies)
                            .sort(function(a,b) { return a.dexterity < b.dexterity })
                            .filter(e => !e.isDead)
    }

    getAllActorsByInitiative() {
        return this.heroes.concat(this.enemies)
                            .sort(function(a,b) { return a.dexterity < b.dexterity })
    }

    getActiveActor() {
        const actors = this.getActorsByInitiative()
        let actor =  actors.find(a => a.isTurnActive === true)
        return actor
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

    heroesDead() {
        let allDead = true
        this.enemies.forEach((e) => {
            if(e.isDead === false) {
                allDead = false
            }
        })
        return allDead
    }

    setDeathStatus() {
        this.getActorsByInitiative().forEach(a => {
            if(a.health <= 0) {
                a.isDead = true
            }
        })
    }

    clearTurnState() {
        this.getAllActorsByInitiative().forEach(a => {
            a.isTurnActive = false
        })
    }

    resetPartyAP() {
        this.heroes.forEach(hero => {
            hero.current_ap = hero.max_ap
        })
    }

    setActiveTurn() {
        let active_index = 0
        // get current index of active actor
        this.getAllActorsByInitiative().forEach((actor,i) => {
            if(actor.isTurnActive) {
                active_index = i
            }
        })
        // set current active actor turn to false
        this.getAllActorsByInitiative()[active_index].isTurnActive = false
        // reset index if we are at the end of the array, else move forward by one
        active_index >= (this.getAllActorsByInitiative().length - 1) ? active_index = 0 : active_index++
        // keep going until we get an actor that isnt dead
        while(this.getAllActorsByInitiative()[active_index].isDead === true) {
            active_index++
        }
        this.getAllActorsByInitiative()[active_index].isTurnActive = true
    }

    nextTurn() {
        this.setDeathStatus()
        // Victory check
        if(this.enemiesDead()) {
            console.log('Victory!')
            instance.sceneManager.loadNextScene()
        } else {
            this.setActiveTurn()
             // reset ap
             this.getActiveActor().current_ap = this.getActiveActor().max_ap
             if(!this.getActiveActor().isHero) {
                 setTimeout(() => this.startEnemyTurn(), 1000)
             } 
        }
    }


    startCombat() {
        console.log('combat started!', this.getActorsByInitiative())
        this.clearTurnState()
        this.resetPartyAP()
        this.getAllActorsByInitiative()[0].isTurnActive = true
        if(this.getActiveActor().isHero) {
            this.startHeroTurn()
        } else {
            this.startEnemyTurn()
        }
    }

    startHeroTurn() {
        console.log('Hero turn started!')
    }

    startEnemyTurn() {
        console.log('Enemy turn started!')
        let enemy = this.getActiveActor()
        // select hero target at random
        let targetIndex = Utils.Roll(this.heroes.filter(h => !h.isDead).length)
        targetIndex--
        let targetHero = this.heroes.filter(h => !h.isDead)[targetIndex]
        if (targetHero != null) {
            enemy.actions.forEach(action => {
                if(action.name === 'attack') {
                    action.onExecute(this.heroes.filter(h => !h.isDead)[targetIndex])
                }
            });
            this.nextTurn()
        } else { 
            instance.sceneManager.changeScene(new defeat_scene())
            console.log('Your party was defeated..')
        }
    }
}