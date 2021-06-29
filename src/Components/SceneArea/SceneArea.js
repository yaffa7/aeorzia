import React from 'react'
import { useGameStore } from '../../GameContext'
import { BattleScene } from '../Scenes/BattleScene'
import { GameOverScreen } from '../Scenes/GameOverScreen'
import './SceneArea.css'


export const SceneArea = () => {
    const gameStore = useGameStore()
    const scene = gameStore.sceneManager.current_scene

    const computeBackgroundStyle = () => {
        return { backgroundImage: `url(${scene.background_image})` }
    }

    return (
        <>
            <div className="scene-area" style={computeBackgroundStyle()}>
                {scene.isBattleScene &&
                    <BattleScene />
                }
                {scene.isDefeatScene &&
                    <GameOverScreen />
                }
            </div>
        </>
    )
}
