import React from 'react'
import HeroSheet from './HeroSheet/HeroSheet'
import './SceneArea.css'
import TurnOrder from './TurnOrder'

export default class SceneArea extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            game: props.game,
            scene: props.game.sceneManager.current_scene,
        }
    }

    componentDidMount() {
        this.state.scene.registerCallback(() => this.setState(this.state.game.sceneManager.current_scene))
    }

    handleSceneChange = scene => {
        this.setState({ scene: scene})
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
                {
                    this.state.scene.isBattleScene &&
                    <div>
                        <TurnOrder game={this.props.game} onSceneChange={this.handleSceneChange}></TurnOrder>
                        <HeroSheet game={this.props.game} onSceneChange={this.handleSceneChange}></HeroSheet>
                    </div>
                }
            </div>
        )
    }
}