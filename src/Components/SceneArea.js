import React from 'react'
import BattleScene from './Scenes/BattleScene'
import GameOverScreen from './Scenes/GameOverScreen'
import './SceneArea.css'


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
        return { backgroundImage: `url(${this.state.scene.background_image})` }
    }

    render() {
        return (
            <div>
                <div className="scene-area" style={this.computeBackgroundStyle()}>
                    { this.state.scene.isBattleScene &&
                        <BattleScene game={this.state.game} scene={this.state.scene} handleSceneChange={this.handleSceneChange}/>
                    }
                    { this.state.scene.isDefeatScene && 
                        <GameOverScreen />
                    }
                </div>
            </div>
        )
    }
}