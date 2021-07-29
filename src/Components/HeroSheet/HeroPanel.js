import { Observer } from 'mobx-react'
import { useGameStore } from '../../GameContext'

const HeroPanel = (props) => {
    const gameStore = useGameStore()
    return (
        <Observer>
            {() =>
                <div className={props.hero.isDead ? 'character-sheet dead' : 'character-sheet'}>
                    <div>{props.hero.name}</div>
                    {/* {props.hero.actions.map((action) =>
                        <button disabled={!props.hero.isTurnActive} style={{ display: 'block' }} onClick={() => props.setState(true, action)} key={props.hero.id}><strong>{action.name}</strong></button>
                    )} */}
                    {/* {gameStore.sceneManager.current_scene.enemies.map((enemy) =>
                        props.action && props.hero.isTurnActive && !enemy.isDead &&
                        <button key={enemy.id} onClick={() => props.handleAction(enemy, props.hero)}>{enemy.name} | {enemy.health}</button>
                    )} */}
                    <button onClick={() => props.setActivePanel('skills')}>Skills</button>
                    <button onClick={() => props.setActivePanel('items')}>Items</button>
                    <button onClick={() => props.setActivePanel('details')}>Details</button>
                    <div>AP: {props.hero.current_ap} </div>
                    <div>Health: {props.hero.health} </div>
                    <button disabled={!props.hero.isTurnActive} onClick={() => props.endTurn()}>end turn</button>
                </div>
            }
        </Observer>

    )
}

export default HeroPanel