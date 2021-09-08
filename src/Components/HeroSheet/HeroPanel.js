import { Observer } from 'mobx-react'
import { useGameStore } from '../../GameContext'

const HeroPanel = (props) => {
    const gameStore = useGameStore()

    const computeClassName = () => {
        let classname = ''
        props.hero.isDead === true ? classname += 'character-sheet dead ' : classname += 'character-sheet '
        props.hero.isTurnActive === true ? classname += 'active' : classname += 'inactive'

        return classname
    }

    return (
        <Observer>
            {() =>
                <div className={computeClassName()}>
                    <div>{props.hero.name}</div>
                    {props.hero.actions.map(action => (
                        <button disabled={!props.hero.isTurnActive} style={{ display: 'block' }} onClick={() => props.setState(true, action)} key={props.hero.id}><strong>{action.name}</strong></button>
                    ))}
                    {props.hero.isTurnActive &&
                        <>
                            <button onClick={() => props.setActivePanel('skills')}>Skills</button>
                            <button onClick={() => props.setActivePanel('items')}>Items</button>
                            <button onClick={() => props.setActivePanel('details')}>Details</button>
                        </>
                    }
                    <div>AP: {props.hero.current_ap} </div>
                    <div>Health: {props.hero.health} </div>
                    <button disabled={!props.hero.isTurnActive} onClick={() => props.endTurn()}>end turn</button>
                </div>
            }
        </Observer>

    )
}

export default HeroPanel