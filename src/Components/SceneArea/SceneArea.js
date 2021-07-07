import { Observer } from 'mobx-react-lite'
import { useGameStore } from '../../GameContext'
import { BattleScene } from '../Scenes/BattleScene'
import { GameOverScreen } from '../Scenes/GameOverScreen'
import './SceneArea.css'


export const SceneArea = () => {
    const gameStore = useGameStore()

    const computeBackgroundStyle = () => {
        return { backgroundImage: `url(${gameStore.sceneManager.current_scene.background_image})` }
    }

    return (
        <Observer>
            {() =>
                <div className="scene-area" style={computeBackgroundStyle()}>
                    {gameStore.sceneManager.current_scene.isBattleScene &&
                        <BattleScene />
                    }
                    {gameStore.sceneManager.current_scene.isDefeatScene &&
                        <GameOverScreen />
                    }
                </div>
            }
        </Observer>
    )
}
