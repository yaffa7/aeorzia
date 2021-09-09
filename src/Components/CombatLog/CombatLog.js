import { Observer } from "mobx-react-lite"
import { useGameStore } from "../../GameContext"

export const CombatLog = () => {
    const gameStore = useGameStore()
    console.log(gameStore.combat_log)
    return (
        <Observer>
            {() => 
                <div class="combat-log">
                    {gameStore.combat_log.slice().reverse().map((m) => 
                            <div className="message">{m}</div>
                    )}
                </div>
            }
        </Observer>
    )
}