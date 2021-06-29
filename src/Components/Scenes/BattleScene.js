
import React from 'react'
import { TurnOrder } from "../TurnOrder/TurnOrder"
import { HeroSheet } from "../HeroSheet/HeroSheet"
import { GameContext } from '../../GameContext'

export class BattleScene extends React.Component {
    static contextType = GameContext

    constructor() {
        super()
        this.state = {
            scene: null
        }
    }

    componentDidMount() {
        const context = this.context;
        this.setState({scene: context.sceneManager.current_scene })
        this.state.scene.startCombat()
    }

    render() {
        return (
            <>
                <div className="name-area">{this.state.scene.name}</div>
                <div className="monster-area">
                    {this.state.scene.enemies.map((enemy) =>
                        !enemy.isDead &&
                        <div className="enemy" key={enemy.id}>{enemy.name} | ac {enemy.armor_class} | hp: {enemy.health}</div>
                    )}
                </div>
                <TurnOrder />
                <HeroSheet />
            </>
        )
    }
}