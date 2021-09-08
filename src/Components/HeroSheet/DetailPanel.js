import './DetailPanel.scss'
import { useGameStore } from '../../GameContext'

const DetailPanel = (props) => {
    const gameStore = useGameStore()
    
    const activePanel = () => {
        if (props.activePanel === 'skills') {
            return (
                <>
                    {props.hero.skills.map(s => (
                        <button>{s.skillName}</button>
                    ))}
                    {gameStore.sceneManager.current_scene.enemies.map((enemy) =>
                        props.action && props.hero.isTurnActive && !enemy.isDead &&
                        <button key={enemy.id} onClick={() => props.handleAction(enemy, props.hero)}>{enemy.name} | {enemy.health}</button>
                    )}
                </>
            )
        }
        if (props.activePanel === 'items') {
            return (
                <>
                    {props.hero.items.map(i => (
                        <button>{i.name}</button>
                    ))}
                </>
            )
        }
        if(props.activePanel ==='details') {
            return (
                <>
                   <div>{'STR:' + props.hero.strength + ' DEX:' + props.hero.dexterity + ' CON:' + props.hero.constitution + " INT:" + props.hero.intelligence + " CHAR:" + props.hero.charisma}</div>
                </>
            )
        }
    }
    return (
        <>
            <strong>{props.activePanel}</strong>
            <br />
            {activePanel()}
        </>
    )
}

export default DetailPanel