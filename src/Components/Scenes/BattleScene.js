
import React from 'react'
import { instance } from '../../GameStore'
import { Observer } from 'mobx-react-lite';
import { TurnOrder } from "../TurnOrder/TurnOrder"
import { HeroSheet } from '../HeroSheet/HeroSheet'
import './BattleScene.scss'

export class BattleScene extends React.Component {

    componentDidMount() {
        if(!instance.sceneManager.current_scene.combatStarted){
            instance.sceneManager.current_scene.startCombat()
        }
    }

    computeBackgroundStyle = () => {
        return { backgroundImage: `url(${instance.sceneManager.current_scene.background_image})` }
    }

    nextScene = () => {
        instance.partyGold += Math.floor(instance.sceneManager.current_scene.gold_reward)
        instance.sceneManager.loadNextScene()
    }

    render() {
        return (
            <Observer>
                {() => <>
                    <div className="panel no-padding">
                    <div className="scene-area" style={this.computeBackgroundStyle()}>
                        <div className="monster-area">
                            {instance.sceneManager.current_scene.enemies.map((enemy) =>
                                !enemy.isDead &&
                                <div className="monster" key={enemy.id + 'monster-area'}>
                                    <div>{enemy.name} | ac: {enemy.armor_class} | hp: {enemy.health}</div>
                                    <img alt={enemy.name} src={enemy.image ? enemy.image : ""}></img>
                                </div>
                            )}
                            {instance.sceneManager.current_scene.victory &&
                                <div className="reward-container">
                                    <div>Victory! rewards:</div>
                                    <div> Gold: {instance.sceneManager.current_scene.generateGoldReward()}</div>
                                    <div>Items </div>
                                    {instance.sceneManager.current_scene.droppedItems.map((item) =>
                                        <div className="item">
                                            {item.name}
                                            <span>
                                                <button onClick={() => instance.sceneManager.current_scene.transferItem(item)}>Take</button>
                                            </span>
                                        </div>
                                    )}
                                    <button onClick={() => this.nextScene()}>Next</button>
                                </div>
                            }
                        </div>
                        <TurnOrder />
                    </div>
                    </div>
                    <HeroSheet />
                </>
                }
            </Observer>
        )
    }
}

export default BattleScene