import { Observer } from 'mobx-react-lite'
import { useGameStore } from '../../GameContext'
import { BattleScene } from '../Scenes/BattleScene'
import { GameOverScreen } from '../Scenes/GameOverScreen'
import { VictoryScene } from '../Scenes/VictoryScene'
import './SceneArea.scss'


export const SceneArea = () => {
    const gameStore = useGameStore()
    console.log("scene area scne", gameStore.sceneManager.current_scene)
    return (
        <Observer>
            {() =>
                <>
                    <div className="panel text-medium">{gameStore.sceneManager.current_scene.name} - Gold:{gameStore.partyGold}</div>
                    <div></div>
                    {gameStore.sceneManager.current_scene.isBattleScene &&
                        <BattleScene />
                    }
                    {gameStore.sceneManager.current_scene.isDefeatScene &&
                        <GameOverScreen />
                    }
                    {gameStore.sceneManager.current_scene.isVictoryScene &&
                        <VictoryScene />
                    }
                </>
            }
        </Observer>
    )
}
