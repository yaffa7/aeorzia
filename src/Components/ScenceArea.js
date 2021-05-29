import React from 'react'
import HeroSheet from './HeroSheet'
import './SceneArea.css'

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
                <HeroSheet game={this.props.game} onSceneChange={this.handleSceneChange}></HeroSheet>
            </div>
        )
    }
}