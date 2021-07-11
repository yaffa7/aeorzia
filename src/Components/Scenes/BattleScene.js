
import React from 'react'
import { instance } from '../../GameStore'
import { Observer } from 'mobx-react-lite';
import { TurnOrder } from "../TurnOrder/TurnOrder"
import { HeroSheet } from '../HeroSheet/HeroSheet'
import './BattleScene.scss'

export class BattleScene extends React.Component {

    componentDidMount() {
        instance.sceneManager.current_scene.startCombat()
    }

    computeBackgroundStyle = () => {
        return { backgroundImage: `url(${instance.sceneManager.current_scene.background_image})` }
    }


    render() {
        return (
            <Observer>
                {() => <>
                    <div className="scene-area" style={this.computeBackgroundStyle()}>
                        <div className="monster-area">
                            {instance.sceneManager.current_scene.enemies.map((enemy) =>
                                !enemy.isDead &&
                                <div className="monster" key={enemy.id + 'monster-area'}>{enemy.name} | ac: {enemy.armor_class} | hp: {enemy.health}</div>
                            )}
                        </div>
                        <TurnOrder />
                    </div>
                    <HeroSheet />
                </>
                }
            </Observer>
        )
    }
}