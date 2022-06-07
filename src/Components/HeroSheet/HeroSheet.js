import React from 'react'
import { useGameStore } from '../../GameContext'
import './HeroSheet.scss'
import { Observer } from 'mobx-react-lite';
import { CombatLog } from '../CombatLog/CombatLog';

export const HeroSheet = () => {
    const gameStore = useGameStore()
    return (
        <Observer>
            {() =>
                <div className="hero-sheet-container">
                    {
                        gameStore.sceneManager.current_scene.heroes.map((hero) =>
                        {
                            let panelClass = "character-sheet "
                            if(hero.isDead){ panelClass += 'dead'}
                            if(hero.isTurnActive){ panelClass += 'active'}
                    
                           const enemyModal = gameStore.sceneManager.current_scene.enemies.map((enemy) => {
                                if(enemy.isDead){
                                    return null
                                }
                                let handler
                                if(gameStore.activeAction){
                                    handler = gameStore.handleAction
                                }else if(gameStore.activeSkill){
                                    handler = gameStore.handleSkill
                                } else if(gameStore.activeItem) {
                                    handler = gameStore.handleItem
                                }
                                else {
                                    return null
                                }

                              
                                return <button key={enemy.id} onClick={() => handler(enemy, hero)}>{enemy.name} | {enemy.health}</button>
                            })

                            const heroesModal = gameStore.sceneManager.current_scene.heroes.map((modalHero) => {
                                if(modalHero.isDead){
                                    return null
                                }
                                let handler
                                if(gameStore.activeAction){
                                    handler = gameStore.handleAction
                                }else if(gameStore.activeSkill){
                                    handler = gameStore.handleSkill
                                } else if(gameStore.activeItem) {
                                    handler = gameStore.handleItem
                                }
                                else {
                                    return null
                                }

                              
                                return <button key={modalHero.id} onClick={() => handler(modalHero, hero)}>{modalHero.name} | {modalHero.health}</button>
                            })
                           const actionModal = hero.actions.map((action) =>
                                <div disabled={!hero.isTurnActive} 
                                    className="modal-item"
                                    onClick={
                                        (e) => {
                                            e.stopPropagation()
                                            gameStore.activateAction(action)
                                    }} key={hero.id}>
                                    <strong>{action.name}</strong>
                                    {
                                        gameStore.activeAction && 
                                        hero.isTurnActive && 
                                        gameStore.activeAction.name === action.name ? 
                                            <div className="modal-container">
                                                {enemyModal}
                                            </div>
                                        :null
                                    }
                                </div>
                                
                            )
                            const skillModal = hero.skills.map((skill) => {
                                return (
                                    <div disabled={!hero.isTurnActive} 
                                    className="modal-item"
                                    onClick={
                                        (e) => {
                                            e.stopPropagation()
                                            gameStore.activateSkill(skill)
                                    }} key={hero.id}>
            
                                        <strong>{skill.name}</strong>
                                        {
                                            gameStore.activeSkill && 
                                            hero.isTurnActive && 
                                            gameStore.activeSkill.name === skill.name ? 
                                                <div className="modal-container">
                                                    {enemyModal}
                                                </div>
                                            :null
                                        }
                                    </div>
                                )
                            })

                            const itemModal = hero.items.map((item) => {
                                return (
                                    <div disabled={!hero.isTurnActive} 
                                    className="modal-item"
                                    onClick={
                                        (e) => {
                                            e.stopPropagation()
                                            gameStore.activateItem(item)
                                    }} key={hero.id}>
            
                                        <strong>{item.name}</strong>
                                        {
                                            gameStore.activeItem && 
                                            hero.isTurnActive ? 
                                                <div className="modal-container">
                                                    {enemyModal}
                                                    {heroesModal}
                                                </div>
                                            :null
                                        }
                                    </div>
                                )
                            
                            })

                            return (
                                <div className="panel text-medium" key={hero.id}>
                                    <div className={panelClass}>
                                        <div>{hero.name}</div>
                                        <button 
                                            disabled={!hero.isTurnActive || gameStore.sceneManager.current_scene.victory} 
                                            style={{ position: "relative"}} 
                                            onClick={gameStore.toggleShowActions}>
                                            Action
                                            {gameStore.showActions && hero.isTurnActive ? 
                                                <div className="modal-container">
                                                    {actionModal}
                                                </div>
                                            :null}
                                        </button>
                                       
                                        <button 
                                            disabled={!hero.isTurnActive || gameStore.sceneManager.current_scene.victory} 
                                            style={{ position: "relative"}} 
                                            onClick={gameStore.toggleShowSkills}>
                                            Skill
                                            {gameStore.showSkills && hero.isTurnActive ? 
                                                <div className="modal-container">
                                                    {skillModal}
                                                </div>
                                            :null}
                                        </button>

                                        <button 
                                            disabled={!hero.isTurnActive || gameStore.sceneManager.current_scene.victory} 
                                            style={{ position: "relative"}} 
                                            onClick={gameStore.toggleShowItems}>
                                            
                                            Items
                                            {gameStore.showItems && hero.isTurnActive ? 
                                                <div className="modal-container">
                                                    {itemModal}
                                                </div>
                                            :null}
                                        </button>
                                        
                                       
                                        
                                        <div>AP: {hero.current_ap} </div>
                                        <div>Health: {hero.health} </div>
                                        <div data-descr={'STR:' + hero.strength + ' DEX:' + hero.dexterity + ' CON:' + hero.constitution + " INT:" + hero.intelligence + " CHAR:" + hero.charisma}>Stats</div>
                                        <button disabled={!hero.isTurnActive || gameStore.sceneManager.current_scene.victory} onClick={() => gameStore.endTurn()}>end turn</button>
                                    </div>
                                </div>
                            )
                        }
                    )}
                    <CombatLog/>
                </div>
            }
        </Observer>
    )
}