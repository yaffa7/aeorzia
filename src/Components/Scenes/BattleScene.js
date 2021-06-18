
import TurnOrder from "../TurnOrder/TurnOrder"
import HeroSheet from "../HeroSheet/HeroSheet"
import React from 'react'

export default class BattleScene extends React.Component {

    constructor(props) {
        super(props)
        this.props.scene.startCombat()
    }

    render() {
        return (
            <div>
                <div className="name-area">{this.props.scene.name}</div>
                <div className="monster-area">
                    {this.props.scene.enemies.map((enemy) =>
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