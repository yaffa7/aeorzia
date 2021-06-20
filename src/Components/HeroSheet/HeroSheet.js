import React from 'react'
import './HeroSheet.css'

export default class HeroSheet extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            onSceneChange: props.onSceneChange,
            scene: props.game.sceneManager.current_scene,
            targetAction: false,
            action: null
        }
    }

    componentDidMount() {
        window.game.sceneManager.registerCallback(() => this.setState({ scene: window.game.sceneManager.current_scene }))
    }

    handleAction = (target, hero) => {
        this.state.action.onExecute(target)
        this.state.onSceneChange(this.state.scene)
        this.setState({ targetAction: false })
        if (hero.current_ap === 0) {
            this.endTurn()
        }
    }

    endTurn = () => {
        console.log('Turn ended')
        this.state.scene.nextTurn()
        this.state.onSceneChange(this.state.scene)
    }

    onAttackClicked = () => {

    }

    render() {
        return (
            <div>
                {this.state.scene.heroes.map((hero) =>
                    <div className={hero.isDead ? 'character-sheet dead' : 'character-sheet'}>
                        <div >Name: {hero.name}</div>
                        {hero.actions.map((action) =>
                            <button disabled={!hero.isTurnActive} style={{ display: 'block' }} onClick={() => this.setState({ targetAction: true, action: action })}>{action.name}</button>
                        )}
                        {this.state.scene.enemies.map((enemy) =>
                            this.state.targetAction && hero.isTurnActive && !enemy.isDead &&
                            <button onClick={() => this.handleAction(enemy, hero)}>{enemy.name} | {enemy.health}</button>

                        )}
                        <div>AP: {hero.current_ap} </div>
                        <div>Health: {hero.health} </div>
                        <div >strength: {hero.strength}</div>
                        <div >dexterity: {hero.dexterity}</div>
                        <div >constitution: {hero.constitution}</div>
                        <div >intelligence: {hero.intelligence}</div>
                        <div >charisma: {hero.charisma}</div>
                        <button disabled={!hero.isTurnActive} onClick={this.endTurn}>end turn</button>
                    </div>
                )}
            </div>
        )
    }

}