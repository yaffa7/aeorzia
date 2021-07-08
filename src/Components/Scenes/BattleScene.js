
import React from 'react'
import { TurnOrder } from "../TurnOrder/TurnOrder"
import { HeroSheet } from "../HeroSheet/HeroSheet"
import { instance } from '../../GameStore'
import { Observer } from 'mobx-react-lite';

export class BattleScene extends React.Component {

    constructor() {
        super()
    }

    componentDidMount() {
        instance.sceneManager.current_scene.startCombat()
    }

    render() {
        return (
            <>
                <Observer>
                    {() => <>
                        <div className="name-area">{instance.sceneManager.current_scene.name}</div>
                        <div className="monster-area">
                            {instance.sceneManager.current_scene.enemies.map((enemy) =>
                                !enemy.isDead &&
                                <div className="enemy" key={enemy.id + 'monster-area'}>{enemy.name} | ac: {enemy.armor_class} | hp: {enemy.health}</div>
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