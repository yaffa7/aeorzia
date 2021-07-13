import React from 'react'
import { useGameStore } from '../../GameContext'
import './HeroSheet.scss'
import { Observer } from 'mobx-react-lite';

export const HeroSheet = () => {
    const gameStore = useGameStore()
    const [targetAction, setTargetAction] = React.useState("")
    const [targetSkill, setTargetSkill] = React.useState("")
    const [action, setAction] = React.useState("")


    const handleAction = (target, hero) => {
        if (targetSkill) {
            target.onSkillUsedOn(targetSkill,hero)
        } else {
            action.onExecute(target)
        }
        setTargetAction(false)
        setTargetSkill(null)
        if (hero.current_ap === 0) {
            endTurn()
        }
    }

    const setState = (targetAction, action, skill) => {
        setTargetSkill(skill)
        setTargetAction(targetAction)
        setAction(action)
    }

    const endTurn = () => {
        console.log('Turn ended')
        gameStore.sceneManager.current_scene.nextTurn()
    }

    return (
        <Observer>
            {() =>
                <div className="hero-sheet-container">
                    {gameStore.sceneManager.current_scene.heroes.map((hero) =>
                        <div className={hero.isDead ? 'character-sheet dead' : 'character-sheet'}>
                            <div>{hero.name}</div>
                            {hero.actions.map((action) =>
                                <button disabled={!hero.isTurnActive} style={{ display: 'block' }} onClick={() => setState(true, action)} key={hero.id}>{action.name}</button>
                            )}
                            {hero.skills.map((skill) => 
                                <button disabled={!hero.isTurnActive} onClick={() => setState(true, action, skill)}>{skill.skillName}</button>
                            )}
                            {gameStore.sceneManager.current_scene.enemies.map((enemy) =>
                                targetAction && hero.isTurnActive && !enemy.isDead &&
                                <button key={enemy.id} onClick={() => handleAction(enemy, hero)}>{enemy.name} | {enemy.health}</button>
                            )}
                            
                            <div>AP: {hero.current_ap} </div>
                            <div>Health: {hero.health} </div>
                            <div data-descr={'STR:' + hero.strength + ' DEX:' + hero.dexterity + ' CON:' + hero.constitution + " INT:" + hero.intelligence + " CHAR:" + hero.charisma}>Stats</div>
                            <div><strong>Items</strong></div>
                            { hero.items.map((item) => 
                                <div>{item.name}</div>
                            )}
                            <button disabled={!hero.isTurnActive} onClick={() => endTurn()}>end turn</button>
                        </div>
                    )}
                </div>
            }
        </Observer>
    )
}