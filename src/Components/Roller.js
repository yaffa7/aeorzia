import React from 'react'
import Utils from '../GameLogic/Classes/Utils'

export default class Roller extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            roll: 0,
            sides: 5
        }
    }

    rollRandom = () => {
        this.setState( { roll: Utils.Roll(this.state.sides)})
    }

    setSides = (data) => {
        this.setState({ sides: data})
    }

    render() {
        return (
            <div>
                <button onClick={this.rollRandom}>Roll</button>
                <select 
                    onChange={e => this.setSides(e.target.value)}>
                    <option value="5">d5</option>
                    <option value="10">d10</option>
                    <option value="20">d20</option>
                </select>
                <div>Result: {this.state.roll}</div>
            </div>
        )
    }
}