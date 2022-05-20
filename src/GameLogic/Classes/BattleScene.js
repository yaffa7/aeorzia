import { GameStore, instance } from "../../GameStore";
import defeat_scene from "../Impl/Scenes/defeat_scene";
import Scene from "./Scene";
import Utils from './Utils'


export default class BattleScene extends Scene {

    gold_reward;
    // Only returns alive heroes
    getActorsByInitiative() {
        return this.heroes.concat(this.enemies)
                            .sort(function(a,b) { return b.dexterity < a.dexterity })
                            .filter(e => !e.isDead)
    }

    getAllActorsByInitiative() {
        return this.heroes.concat(this.enemies)
                            .sort(function(a,b) { 
                                return b.dexterity < a.dexterity })
    }

    getActiveActor() {
        const actors = this.getActorsByInitiative()
        let actor =  actors.find(a => a.isTurnActive === true)
        return actor
    }

    getActiveHero() {
        let activeHeros = this.heroes.filter(hero => hero.isTurnActive === true)
        if (activeHeros.length == 0) {
            return []
        }
        return activeHeros
    }

    getInactiveHeroes() {
        let activeHeros = this.heroes.filter(hero => hero.isTurnActive === false)
        return activeHeros
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
        let curActors = this.getAllActorsByInitiative()
        curActors.forEach((actor,i) => {
            if(actor.isTurnActive) {
                active_index = i
            }
        })
        // set current active actor turn to false
        curActors[active_index].isTurnActive = false
        // reset index if we are at the end of the array, else move forward by one
        active_index >= (curActors.length - 1) ? active_index = 0 : active_index++
        // keep going until we get an actor that isnt dead
        while(curActors[active_index].isDead === true ) {
            active_index >= (curActors.length - 1) ? active_index = 0 : active_index++
        }
        curActors[active_index].isTurnActive = true
        console.log("set turns",curActors)
    }

    nextTurn() {
        this.setDeathStatus()
        // Victory check
        if(this.enemiesDead()) {
            Utils.log('Victory!')
            Utils.log('----------------------------------------------------------')
            this.generateLootDrops()
            this.victory = true
        } else {
            this.setActiveTurn()
             // reset ap
             this.getActiveActor().current_ap = this.getActiveActor().max_ap
             if(!this.getActiveActor().isHero) {
                 setTimeout(() => this.startEnemyTurn(), 500)
             } 
        }
    }


    startCombat() {
        Utils.log(`combat started!`)
        let curActors = this.getAllActorsByInitiative()
        curActors.forEach((curActor)=>{
            console.log({...curActor})
        })
        this.clearTurnState()
        this.resetPartyAP()
        curActors[0].isTurnActive = true
        if(this.getActiveActor().isHero) {
            this.startHeroTurn()
        } else {
            this.startEnemyTurn()
        }
        this.combatStarted = true
    }

    startHeroTurn() {
        Utils.log('Hero turn started!')
    }

    startEnemyTurn() {
        Utils.log('Enemy turn started!')
        let enemy = this.getActiveActor()
        // select hero target at random
        let targetIndex = Utils.Roll(this.heroes.filter(h => !h.isDead).length)
        targetIndex--
        let targetHero = this.heroes.filter(h => !h.isDead)[targetIndex]
        if (targetHero != null) {
            instance.onAttack(enemy, targetHero)
            this.nextTurn()
        } else { 
            instance.sceneManager.changeScene(new defeat_scene())
            Utils.log('Your party was defeated..')
        }
    }

    generateLootDrops() {
        let someEnemy = this.getAllActorsByInitiative().filter(actor => actor.isHero === false)[0]
        this.droppedItems = someEnemy.DROP_TABLE
    }

    transferItem(item) {
        // Give the hero the item
        this.getActiveActor().items.push(item)
        // Remove the item from the scene's drops
        this.droppedItems = this.droppedItems.filter(existing => existing.id !== item.id)
    }

    generateGoldReward() {
        if(this.gold_reward == null) {
            this.gold_reward =  this.enemies.length * 100 * (1.0 + (Utils.Roll(50) / 100))
        }
        return this.gold_reward
    }
}