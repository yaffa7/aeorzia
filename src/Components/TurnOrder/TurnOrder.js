import React from 'react'
import { useGameStore } from '../../GameContext'
import { Observer } from 'mobx-react-lite'
import './TurnOrder.css'

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

    return (
        <Observer>
            {() =>
                <div className="turn-container">
                    <div>Turn Order</div>
                    {
                        gameStore.sceneManager.current_scene.getActorsByInitiative().map((actor) =>
                            <div className={getComputedClassName(actor)} key={actor.id + 'turn-order'}> {actor.name}</div>
                        )
                    }
                </div>
            }
        </Observer>
    )
}