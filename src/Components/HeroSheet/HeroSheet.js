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
                            console.log("mapppin heroes")
                            let panelClass = "character-sheet "
                            if(hero.isDead){ panelClass += 'dead'}
                            if(hero.isTurnActive){ panelClass += 'active'}
                    
                           const enemyModal = gameStore.sceneManager.current_scene.enemies.map((enemy) =>{
                                if(enemy.isDead){
                                    return null
                                }
                                let handler
                                if(gameStore.activeAction && !gameStore.activeSkill){
                                    handler = gameStore.handleAction
                                }else if(gameStore.activeSkill){
                                    handler = gameStore.handleSkill
                                }else{
                                    return null
                                }
                                return <button key={enemy.id} onClick={() => handler(enemy, hero)}>{enemy.name} | {enemy.health}</button>
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
                            console.log("states",hero.isTurnActive, gameStore.activeSkill, gameStore.activeAction)
                            return (
                                <div className="panel text-medium">
                                    <div className={panelClass}>
                                        <div>{hero.name}</div>
                                        <button 
                                            disabled={!hero.isTurnActive} 
                                            style={{ position: "relative"}} 
                                            onClick={gameStore.toggleShowActions}>
                                            Action
                                            {gameStore.showActions && hero.isTurnActive? 
                                                <div className="modal-container">
                                                    {actionModal}
                                                </div>
                                            :null}
                                        </button>
                                       
                                        <button 
                                            disabled={!hero.isTurnActive} 
                                            style={{ position: "relative"}} 
                                            onClick={gameStore.toggleShowSkills}>
                                            Skill
                                            {gameStore.showSkills && hero.isTurnActive? 
                                                <div className="modal-container">
                                                    {skillModal}
                                                </div>
                                            :null}
                                        </button>
                                        
                                       
                                        
                                        <div>AP: {hero.current_ap} </div>
                                        <div>Health: {hero.health} </div>
                                        <div data-descr={'STR:' + hero.strength + ' DEX:' + hero.dexterity + ' CON:' + hero.constitution + " INT:" + hero.intelligence + " CHAR:" + hero.charisma}>Stats</div>
                                        <div><strong>Items</strong></div>
                                        { hero.items.map((item) => 
                                            <div>{item.name}</div>
                                        )}
                                        <button disabled={!hero.isTurnActive} onClick={() => gameStore.endTurn()}>end turn</button>
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