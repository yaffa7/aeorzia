import React from 'react'
import { useLocalObservable } from 'mobx-react'
import { GameStore } from './GameStore'

export const GameContext = React.createContext("game")
const store = new GameStore()
window.store = store

export const GameProvider = ({ children }) => {
    const gameStore = useLocalObservable(() => store)

    return <GameContext.Provider value={gameStore}>
        {children}
    </GameContext.Provider>
}

export const useGameStore = () => React.useContext(GameContext)
