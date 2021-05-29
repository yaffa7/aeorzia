import React from 'react'
import './TurnOrder.css'

export default class TurnOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            actors: props.game.sceneManager.current_scene.getActorsByInitiative(),
            onSceneChange: props.onSceneChange,
            scene: props.game.sceneManager.current_scene
        }
    }

    componentDidMount() {
        this.state.scene.registerCallback(() => this.setState(this.state.scene))
    }

    getComputedClassName = (actor) => {
        let className = actor.isHero ? 'hero' : 'enemy'
        if (actor.isTurnActive) {
            className+=' selected'
        }
        return className
    }

    render() {
        return (
            <div className="turn-container">
                <div>Turn Order</div>
                {
                    this.state.actors.map((actor) => 
                        <div className={this.getComputedClassName(actor)}> { actor.name }</div>
                    )
                }
            </div>
        )
    }
}