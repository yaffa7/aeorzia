
import React from 'react'
import { instance } from '../../GameStore'
import { Observer } from 'mobx-react-lite';
import { TurnOrder } from "../TurnOrder/TurnOrder"
import { HeroSheet } from '../HeroSheet/HeroSheet'
import './BattleScene.scss'
import Utils from '../../GameLogic/Classes/Utils';

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
                            { instance.sceneManager.current_scene.victory &&
                                <div className="reward-container"> 
                                    <div>Victory! rewards:</div>
                                    <div> Gold: {instance.sceneManager.current_scene.enemies.length * 100 * (1.0 + (Utils.Roll(50)/100))}</div>
                                    <div>Items </div>
                                    <button onClick={ () => instance.sceneManager.loadNextScene()}>Next</button>
                                </div>
                            }
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