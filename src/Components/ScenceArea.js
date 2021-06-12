import React from 'react'
import HeroSheet from './HeroSheet/HeroSheet'
import './SceneArea.css'
import TurnOrder from './TurnOrder'

export default class ScenceArea extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            scene: props.game.sceneManager.current_scene,

        }
    }

    handleSceneChange = scene => {
        this.setState({ scene })
    }

    computeBackgroundStyle = () => {
        return {
            backgroundImage: `url(${this.state.scene.background_image})`
        }
    }


    render() {
        return (
            <div>
                <div className="scene-area" style={this.computeBackgroundStyle()}>
                    <div className="name-area">{this.state.scene.name}</div>
                    <div className="monster-area">
                        {this.state.scene.enemies.map((enemy) =>
                            !enemy.isDead &&
                            <div className="enemy">{enemy.name} | ac {enemy.armor_class} | hp: {enemy.health}</div>
                        )}
                    </div>
                </div>
                <TurnOrder game={this.props.game} onSceneChange={this.handleSceneChange}></TurnOrder>
                <HeroSheet game={this.props.game} onSceneChange={this.handleSceneChange}></HeroSheet>
            </div>
        )
    }
}