import React from 'react'
import { useGameStore } from '../../GameContext'
import './HeroSheet.scss'
import { Observer } from 'mobx-react-lite';
import HeroPanel from './HeroPanel';
import DetailPanel from './DetailPanel';

export const HeroSheet = () => {
    const gameStore = useGameStore()
    const [targetAction, setTargetAction] = React.useState("")
    const [targetSkill, setTargetSkill] = React.useState("")
    const [action, setAction] = React.useState("")
    const [activePanel, setActivePanel] = React.useState("details")

    const handleAction = (target, hero) => {
        if (targetSkill) {
            target.onSkillUsedOn(targetSkill, hero)
        } else {
            action.onExecute(target)
        }
        setTargetAction(false)
        setTargetSkill(null)
        if (hero.current_ap === 0) {
            endTurn()
        }
    }

    const setState = (targetAction, action, skill) => {
        setTargetSkill(skill)
        setTargetAction(targetAction)
        setAction(action)
    }

    const endTurn = () => {
        console.log('Turn ended')
        gameStore.sceneManager.current_scene.nextTurn()
    }


    return (
        <Observer>
            {() =>
                <div className="hero-sheet-container">
                    <div className="active-row">
                        {gameStore.sceneManager.current_scene.getActiveHero().map((hero) =>
                            <HeroPanel
                                hero={hero}
                                endTurn={endTurn}
                                handleAction={handleAction}
                                setState={setState}
                                action={action}
                                targetAction={targetAction}
                                setActivePanel={setActivePanel}
                            />
                        )}
                        <div className="detail-panel">
                        {gameStore.sceneManager.current_scene.getActiveHero().map((hero) =>
                            <DetailPanel hero={hero} activePanel={activePanel}/>
                        )}
                        </div>
                    </div>
                    <div className="inactive-row">
                    {gameStore.sceneManager.current_scene.getInactiveHeroes().map((hero) =>
                            <HeroPanel
                                hero={hero}
                                endTurn={endTurn}
                                handleAction={handleAction}
                                setState={setState}
                                action={action}
                                targetAction={targetAction}
                            />
                        )}
                    </div>
                </div>
            }
        </Observer>
    )
}