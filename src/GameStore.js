import SceneManager from './GameLogic/Controllers/SceneManager'
import { Felen } from './GameLogic/Impl/Heroes/Felen'
import { Elumbar } from './GameLogic/Impl/Heroes/Elumbar'
import { Ingos } from './GameLogic/Impl/Heroes/Ingos'
import { Varne } from './GameLogic/Impl/Heroes/Varne'
import { makeObservable, observable, runInAction } from 'mobx'
import React from 'react'
import Utils from './GameLogic/Classes/Utils'
import DAMAGE_TYPE from './GameLogic/Constants/DAMAGE_TYPE';


window.React = React

export class GameStore {
    names = ['varne', 'felen', 'elumbar', 'ingos']
    combat_log = []
    heroes = [
        new Felen(),
        new Elumbar(),
        new Ingos(),
        new Varne()
    ]
    sceneManager = new SceneManager(this.heroes)
    partyGold = 0
    activeAction = null
    activeSkill = null
    activeItem = null
    showSkills = false
    showActions = false
    showItems = false
    getRandomName() {
        let randIndex = Math.floor((Math.random() * this.names.length)) - 1
        return this.names.splice(randIndex, 1)[0]
    }
    getHeroes() {
        return this.heroes
    }
    toggleShowItems = () => {
        runInAction(() => {
            this.showItems = !this.showItems;
            this.showSkills = false
            this.showActions = false
            this.activeAction = null
            this.activeSkill = null
            this.activeItem = null
        })
    }
    toggleShowActions = () => {
        runInAction(() => {
            this.showActions = !this.showActions;
            this.showSkills = false
            this.showItems = false
            this.activeAction = null
            this.activeSkill = null
            this.activeItem = null
        })
    }
    toggleShowSkills = () => {
        runInAction(() => {
            this.showSkills = !this.showSkills
            this.showActions = false;
            this.showItems = false
            this.activeAction = null
            this.activeSkill = null
            this.activeItem = null
        })
    }
    activateAction = (action) => {
        runInAction(() => {
            this.activeAction = action
            console.log(this.activeAction)
        })
    }
    handleAction = (target, actor) => {
        console.log(this.activeAction)
        if(this.activeAction.name === "attack"){
            this.onAttack(actor, target)
        } 
        else if(this.activeAction.name === "examine") {
            this.onExamine(actor, target)
        }
        this.resetAbilityState();
    }
    handleItem = (target, actor) => {
        this.onUserItem(actor, target)
    }
    activateItem = (item) => {
        this.activeItem = item
    }
    activateSkill = (skill) => {
        this.activeSkill = skill
        console.log("activated skill", this.activeSkill)
    }
    handleSkill = (target, actor) => {
        this.onSkill(this.activeSkill, target, actor)
        this.resetAbilityState();
    }
    onAttack = (attacker, target) => {
        console.log("start attack", target)
        if (attacker.current_ap >= 2) {
            attacker.current_ap = attacker.current_ap - 2
            Utils.log(`${attacker.name} attacked ${target.name}!`)
            let attackRoll = Utils.Roll(20)
            let damageRoll = Utils.Roll(attacker.strength)
            if (attackRoll >= target.armor_class) {
                Utils.log(`${attacker.name} hits with a damage of ${damageRoll}!`)
                target.health = target.health - damageRoll
            } else {
                Utils.log(attacker.name + ' missed their target ' + target.name + ' with a roll of ' + attackRoll + ".")
            }
        } else { Utils.log(attacker.name + ' Not enough AP!') }

        console.log("end attack", target)
        if(attacker.current_ap === 0){
            this.endTurn()
        }
    }

    onExamine = (actor, target) => {
        if (actor.current_ap >= 1) {
            actor.current_ap--
            Utils.log(`${target.description}`)
        } else { Utils.log(`${actor.name} Not enough AP!`) }

        if(actor.current_ap === 0){
            this.endTurn()
        }
    }

    onUserItem = (actor, target) => {
        if (actor.current_ap >= 1) {
            actor.current_ap--
            this.activeItem.onUse(actor,target) 
            actor.removeItem(this.activeItem)
        }  else { Utils.log(`${actor.name} Not enough AP!`) }

        if(actor.current_ap === 0){
            this.endTurn()
        }
    }
    onSkill = (skill, target, hero) => {
        // this is called when a skill is used on a target
        // the follwing runs from the context of the actor being targeted
        if(hero.current_ap >= skill.apCost) {
            Utils.log(`${hero.name} used ${skill.name} on ${target.name}`)
            hero.current_ap-=skill.apCost
            let damage = Utils.RollFromString(skill.damageRoll)
            if(skill.damageType === DAMAGE_TYPE.HEALING) {
                damage=-damage
            }
            Utils.log(`${hero.name} Rolled for (${skill.damageRoll})  [${damage} ${skill.damageType}]`)
            target.health-=damage
        } else { Utils.log(`${hero.name} Not enough AP!`) }
        if(hero.current_ap === 0){
            this.endTurn()
        }
    }
    endTurn = () => {
        this.sceneManager.current_scene.nextTurn()
        this.resetAbilityState();
    }
    
    resetAbilityState() {
        this.showActions = false;
        this.showSkills = false;
        this.showItems = false;
        this.activeSkill = null;
        this.activeAction = null;
        this.activeItem = null
    }
    constructor() {

        makeObservable(this, {
            partyGold: observable,
            combat_log: observable,
            activeAction : observable,
            activeSkill : observable,
            activeItem: observable,
            showActions : observable,
            showSkills : observable,
            showItems : observable
        })
    }
}

let store = new GameStore();
export const instance = store;
// let newInstance = new GameStore()
// let oldInstance = localStorage.getItem("gameStore")
// if(oldInstance){
//     oldInstance = JSON.parse(oldInstance)
//     newInstance.sceneManager = new SceneManager(oldInstance.heroes, oldInstance.sceneManager)
//     newInstance.heroes = oldInstance.sceneManager.current_scene.heroes
//     let newScenes
//     newScenes = oldInstance.sceneManager.scenes.map((scene) => {
//         scene.enemies = scene.enemies.map((enemy) => {
//             const enemyClass = MOB_TO_CLASS[enemy.name]
//             enemy = new enemyClass(null,enemy)
//             return enemy
//         })
//         return new Scene(scene)
//     });
//     let curSceneEnemies = oldInstance.sceneManager.current_scene.enemies
//     curSceneEnemies = curSceneEnemies.map((enemy) => {
//         const enemyClass = MOB_TO_CLASS[enemy.name]
//         enemy = new enemyClass(null,enemy)
//         return enemy
//     })
//     newInstance.sceneManager.current_scene.enemies = curSceneEnemies
//     newInstance.sceneManager.scenes = newScenes
//     newInstance.combat_log = oldInstance.combat_log
//     newInstance.partyGold = oldInstance.partyGold
//     newInstance.names = oldInstance.names
// }
// export const instance = newInstance
// reaction(() => {
//     localStorage.setItem("gameStore",JSON.stringify(instance))
//     return instance
// }, ()=>{
// })