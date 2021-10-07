import React from 'react'
import { useGameStore } from '../../GameContext'
import './HeroSheet.scss'
import { Observer } from 'mobx-react-lite';
import { CombatLog } from '../CombatLog/CombatLog';

export const HeroSheet = () => {
    const gameStore = useGameStore()
    const [targetAction, setTargetAction] = React.useState("")
    const [targetSkill, setTargetSkill] = React.useState("")
    const [action, setAction] = React.useState("")
    
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
                            return (
                                <div className="panel text-medium">
                                    <div className={panelClass}>
                                        <div>{hero.name}</div>
                                        {hero.actions.map((action) =>
                                            <button disabled={!hero.isTurnActive} style={{ display: 'block' }} onClick={() => {
                                                console.log(gameStore)
                                                gameStore.activateAction(action)
                                            }} key={hero.id}><strong>{action.name}</strong></button>
                                        )}
                                        {hero.skills.map((skill) => 
                                            <button disabled={!hero.isTurnActive} onClick={() => {
                                                gameStore.activateSkill(skill)
                                            }}>{skill.skillName}</button>
                                        )}
                                        {gameStore.sceneManager.current_scene.enemies.map((enemy) =>{
                                            if(enemy.isDead||!hero.isTurnActive){
                                                return null
                                            }
                                            let handler
                                            console.log("activeact ", gameStore.activeAction, gameStore.activeSkill)
                                            if(gameStore.activeAction){
                                                handler = gameStore.handleAction
                                            }else if(gameStore.activeSkill){
                                                handler = gameStore.handleSkill
                                            }else{
                                                return null
                                            }
                                            return <button key={enemy.id} onClick={() => handler(enemy, hero)}>{enemy.name} | {enemy.health}</button>
                                        })}
                                        
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