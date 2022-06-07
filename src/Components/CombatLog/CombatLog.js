import { Observer } from "mobx-react-lite"
import React, { createRef } from 'react'
import { instance } from '../../GameStore'

export class CombatLog extends React.Component {
    constructor(props) {
        super(props)
        this.gameStore = instance
        this.logRef = createRef(null)
    }

    updateScrollPosition = (logRef) => {
        if (logRef.current) {
            if (logRef.current.childNodes.length !== 0) {
                let lastMessage = Array.from(logRef.current.childNodes)[logRef.current.childNodes.length - 1]
                setTimeout(() => lastMessage.scrollIntoView({ behavior: 'smooth' }), 100)
            } else {
                console.log('null case')
            }
        }
    }


    render() {
        return (
            <Observer>
                {() =>
                    <div className="panel">
                        {this.updateScrollPosition(this.logRef)}
                        <div ref={this.logRef} className="combat-log">
                            {this.gameStore.combat_log.map((m, i) =>
                                <div className="message" key={i}>{m}</div>
                            )}
                        </div>
                    </div>
                }
            </Observer>
        )
    }
}