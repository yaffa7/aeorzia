import React from 'react'
import { useLocalObservable } from 'mobx-react'
import { instance } from './GameStore'

export const GameContext = React.createContext("")
window.instance = instance

export const GameProvider = ({ children }) => {
    const gameStore = useLocalObservable(() => instance)
    console.log('store from Provider', instance)

    return <GameContext.Provider value={gameStore}>
        {children}
    </GameContext.Provider>
}

export const useGameStore = () => React.useContext(GameContext)
