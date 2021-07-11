import React from 'react'
import { useGameStore } from '../../GameContext'
import { Observer } from 'mobx-react-lite'
import './TurnOrder.scss'

export const TurnOrder = () => {
    const gameStore = useGameStore()

    const getComputedClassName = (actor) => {
        let className = actor.isHero ? 'hero' : 'enemy'
        if (actor.isTurnActive) {
            className += ' selected'
        }
        if (actor.isDead) {
            className += ' dead'
        }
        return className
    }
    const getActors = () => {
        // In cases where the scene changes mid-combat, check to make sure we can still call
        // the function
        if( gameStore.sceneManager.current_scene.getActorsByInitiative != null) {
            return gameStore.sceneManager.current_scene.getActorsByInitiative()
        } else return []
    }

    return (
        <Observer>
            {() =>
                <div className="turn-container">
                    {
                        getActors().map((actor) =>
                            <div className={getComputedClassName(actor)} key={actor.id + 'turn-order'}> {actor.name}</div>
                        )
                    }
                </div>
            }
        </Observer>
    )
}