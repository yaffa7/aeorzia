import React from 'react'
import { useGameStore } from '../../GameContext'
import './HeroSheet.css'
import { Observer } from 'mobx-react-lite';

export const HeroSheet = () => {
    const gameStore = useGameStore()
    const [targetAction, setTargetAction] = React.useState("")
    const [action, setAction] = React.useState("")


    const handleAction = (target, hero) => {
        action.onExecute(target)
        setTargetAction(false)
        if (hero.current_ap === 0) {
            endTurn()
        }
    }

    const setState = (targetAction, action) => {
        setTargetAction(targetAction)
        setAction(action)
    }

    const endTurn = () => {
        console.log('Turn ended')
        gameStore.sceneManager.current_scene.nextTurn()
    }

    return (
        <Observer>
            { () => <>
                {gameStore.sceneManager.current_scene.heroes.map((hero) =>
                    <div className={hero.isDead ? 'character-sheet dead' : 'character-sheet'}>
                        <div >Name: {hero.name}</div>
                        {hero.actions.map((action) =>
                            <button disabled={!hero.isTurnActive} style={{ display: 'block' }} onClick={() => setState(true, action)} key={hero.id}>{action.name}</button>
                        )}
                        {gameStore.sceneManager.current_scene.enemies.map((enemy) =>
                            targetAction && hero.isTurnActive && !enemy.isDead &&
                            <button key={enemy.id} onClick={() => handleAction(enemy, hero)}>{enemy.name} | {enemy.health}</button>
                        )}
                        <div>AP: {hero.current_ap} </div>
                        <div>Health: {hero.health} </div>
                        <div >strength: {hero.strength}</div>
                        <div >dexterity: {hero.dexterity}</div>
                        <div >constitution: {hero.constitution}</div>
                        <div >intelligence: {hero.intelligence}</div>
                        <div >charisma: {hero.charisma}</div>
                        <button disabled={!hero.isTurnActive} onClick={() => endTurn()}>end turn</button>
                    </div>
                )}
            </>
            }
        </Observer>
    )
}