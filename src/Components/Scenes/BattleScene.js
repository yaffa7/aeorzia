
import React from 'react'
import { TurnOrder } from "../TurnOrder/TurnOrder"
import { HeroSheet } from "../HeroSheet/HeroSheet"
import { useGameStore } from "../../GameContext"

export const BattleScene = () => {
    const gameStore = useGameStore()
    const scene = gameStore.sceneManager.current_scene

    // call this in the scene object somewhere
    // this.props.scene.startCombat()

    return (
        <>
            <div className="name-area">{scene.name}</div>
            <div className="monster-area">
                {scene.enemies.map((enemy) =>
                    !enemy.isDead &&
                    <div className="enemy">{enemy.name} | ac {enemy.armor_class} | hp: {enemy.health}</div>
                )}
            </div>
            <TurnOrder />
            <HeroSheet />
        </>
    )
}