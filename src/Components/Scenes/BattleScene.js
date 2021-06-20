
import TurnOrder from "../TurnOrder/TurnOrder"
import HeroSheet from "../HeroSheet/HeroSheet"
import React from 'react'

export default class BattleScene extends React.Component {

    constructor(props) {
        super(props)
        this.props.scene.startCombat()
        this.state = {
            scene: this.props.scene
        }
    }

    componentDidMount() {
        window.game.sceneManager.registerCallback(() => this.setState({ scene: window.game.sceneManager.current_scene }))
    }

    render() {
        return (
            <div>
                <div className="name-area">{this.state.scene.name}</div>
                <div className="monster-area">
                    {this.state.scene.enemies.map((enemy) =>
                        !enemy.isDead &&
                        <div className="enemy">{enemy.name} | ac {enemy.armor_class} | hp: {enemy.health}</div>
                    )}
                </div>
                <TurnOrder game={this.props.game} onSceneChange={this.props.handleSceneChange}></TurnOrder>
                <HeroSheet game={this.props.game} onSceneChange={this.props.handleSceneChange}></HeroSheet>
            </div>
        )
    }
}