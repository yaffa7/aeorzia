import { Observer } from 'mobx-react-lite'
import { useGameStore } from '../../GameContext'
import { BattleScene } from '../Scenes/BattleScene'
import { GameOverScreen } from '../Scenes/GameOverScreen'
import { VictoryScene } from '../Scenes/VictoryScene'
import './SceneArea.scss'


export const SceneArea = () => {
    const gameStore = useGameStore()
    const newGame = ()=>{
        localStorage.removeItem("gameStore")
        window.location.reload()
    }
    return (
        <Observer>
            {() =>
                <>
                    <div className="panel text-medium">
                        <span>{gameStore.sceneManager.current_scene.name} - Gold:{gameStore.partyGold}</span>
                        <button style={{marginLeft : "15px"}} onClick={newGame}>New Game</button>
                    </div>
                    
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
