import React from 'react'
import { useLocalStore } from 'mobx-react'
import { GameStore } from './GameStore'

const GameContext = React.createContext(null)
const store = new GameStore()
window.store = store

export const GameProvider = ({ children }) => {
    const gameStore = useLocalStore(() => store)

    return <GameContext.Provider value={gameStore}>
        {children}
    </GameContext.Provider>
}

export const useGameStore = () => React.useContext(GameContext)