
import React from 'react'
import { TurnOrder } from "../TurnOrder/TurnOrder"
import { HeroSheet } from "../HeroSheet/HeroSheet"
import { instance } from '../../GameStore'
import { Observer } from 'mobx-react-lite';

export class BattleScene extends React.Component {

    constructor() {
        super()
        console.log(this)
        this.state = {
            scene: instance.sceneManager.current_scene
        }
    }

    componentDidMount() {
        this.state.scene.startCombat()
    }

    render() {
        return (
            <>
                <Observer>
                    {() => <>
                        <div className="name-area">{this.state.scene.name}</div>
                        <div className="monster-area">
                            {this.state.scene.enemies.map((enemy) =>
                                !enemy.isDead &&
                                <div className="enemy" key={enemy.id}>{enemy.name} | ac {enemy.armor_class} | hp: {enemy.health}</div>
                            )}
                        </div>
                    </>
                    }
                </Observer>
                <TurnOrder />
                <HeroSheet />
            </>
        )
    }
}