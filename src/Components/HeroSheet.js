import React from 'react'
import './HeroSheet.css'

export default class HeroSheet extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            onSceneChange: props.onSceneChange,
            scene: props.game.sceneManager.current_scene
        }
    }

    componentDidMount() {
        this.props.game.sceneManager.current_scene.setStateCallback = () => this.setState(this.state.scene)
    }

    handleAction  = (action) => {
        action.onExecute(this.state.scene.enemies[0]) // attack first enemy for now
        this.state.onSceneChange(this.state.scene)
    }

    endTurn = () => {
        console.log('Turn ended')
        this.state.scene.nextTurn()
        this.setState( {scene: this.state.scene} )
    }

    onAttackClicked = () => {
        
    }
 
    render() {
        return (
            <div>
                <div>
                {this.state.scene.heroes.map((hero) =>
                    <div className={ hero.isDead ? 'character-sheet dead' : 'character-sheet'}>
                        <div >Name: {hero.name}</div>
                        {hero.actions.map((action) => 
                            <button disabled={!hero.isTurnActive} style={{display: 'block'}} onClick={() => this.handleAction(action)}>{action.name}</button>
                        )}
                        <div>AP: {hero.current_ap} </div>
                        <div>Health: {hero.health } </div>
                        <div >strength: { hero.strength }</div>
                        <div >dexterity: { hero.dexterity }</div>
                        <div >constitution: { hero.constitution }</div>
                        <div >intelligence: { hero.intelligence }</div>
                        <div >charisma: { hero.charisma }</div>
                        <button disabled={!hero.isTurnActive} onClick={this.endTurn}>end turn</button>
                    </div>
                )}
                </div>
            </div>
        )
    }

}