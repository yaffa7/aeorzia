
import React from 'react'
import { TurnOrder } from "../TurnOrder/TurnOrder"
import { instance } from '../../GameStore'
import { Observer } from 'mobx-react-lite';
import './BattleScene.scss'

export class BattleScene extends React.Component {

    componentDidMount() {
        instance.sceneManager.current_scene.startCombat()
    }

    render() {
        return (
            <>
                <Observer>
                    {() => <>
                        <div className="monster-area">
                            {instance.sceneManager.current_scene.enemies.map((enemy) =>
                                !enemy.isDead &&
                                <div className="monster" key={enemy.id + 'monster-area'}>{enemy.name} | ac: {enemy.armor_class} | hp: {enemy.health}</div>
                            )}
                        </div>
                        <TurnOrder/>
                    </>
                    }
                </Observer>
            </>
        )
    }
}