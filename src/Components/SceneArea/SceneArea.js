import { Observer } from 'mobx-react-lite'
import { useGameStore } from '../../GameContext'
import { BattleScene } from '../Scenes/BattleScene'
import { GameOverScreen } from '../Scenes/GameOverScreen'
import { VictoryScene } from '../Scenes/VictoryScene'
import { HeroSheet } from '../HeroSheet/HeroSheet'
import './SceneArea.scss'


export const SceneArea = () => {
    const gameStore = useGameStore()

    const computeBackgroundStyle = () => {
        return { backgroundImage: `url(${gameStore.sceneManager.current_scene.background_image})` }
    }

    return (
        <Observer>
            {() =>
                <>
                    <div className="name-area">{gameStore.sceneManager.current_scene.name}</div>
                    <div className="scene-area" style={computeBackgroundStyle()}>
                        {gameStore.sceneManager.current_scene.isBattleScene &&
                            <BattleScene />
                        }
                        {gameStore.sceneManager.current_scene.isDefeatScene &&
                            <GameOverScreen />
                        }
                        {gameStore.sceneManager.current_scene.isVictoryScene &&
                            <VictoryScene />
                        }
                    </div>
                    <HeroSheet />
                </>
            }
        </Observer>
    )
}
