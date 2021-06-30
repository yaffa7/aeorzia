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

    heroesDead() {
        let allDead = true
        this.enemies.forEach((e) => {
            if(e.isDead === false) {
                allDead = false
            }
        })
        return allDead
    }

    setActiveTurn() {
         // set active turn
         this.getActorsByInitiative().map((actor) => actor.isTurnActive = actor.name === this.getActiveActor().name ? true : false)
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
       this.setActiveTurn()

        // reset ap
        this.getActiveActor().current_ap = this.getActiveActor().max_ap
        if(!this.getActiveActor().isHero) {
            setTimeout(() => this.startEnemyTurn(), 1000)
        } 
    }

    startCombat() {
        console.log('combat started!', this.getActorsByInitiative())
        // Determine highest initiative in scene
        console.log('Highest Initiative was:', this.getActiveActor().name, 'with an initiative of', this.getActiveActor().dexterity )
        if(this.getActiveActor().isHero) {
            this.startHeroTurn()
        } else {
            this.startEnemyTurn()
        }
    }

    startHeroTurn() {
        console.log('Hero turn started!')
        this.setActiveTurn()
    }

    startEnemyTurn() {
        console.log('Enemy turn started!')
        let enemy = this.getActiveActor()
        console.log('active actor is', enemy)
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
            return;
        }
    }

}