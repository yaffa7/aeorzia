import React from 'react'
import './TurnOrder.css'

export default class TurnOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            onSceneChange: props.onSceneChange,
            scene: props.game.sceneManager.current_scene
        }
    }

    componentDidMount() {
        window.game.sceneManager.registerCallback(() => this.setState({ scene: window.game.sceneManager.current_scene }))
    }

    getComputedClassName = (actor) => {
        let className = actor.isHero ? 'hero' : 'enemy'
        if (actor.isTurnActive) {
            className += ' selected'
        }
        if (actor.isDead) {
            className += ' dead'
        }
        return className
    }

    render() {
        return (
            <div className="turn-container">
                <div>Turn Order</div>
                {
                    this.state.scene.getActorsByInitiative().map((actor) =>
                        <div className={this.getComputedClassName(actor)}> {actor.name}</div>
                    )
                }
            </div>
        )
    }
}