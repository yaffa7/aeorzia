import React from 'react'
import './HeroSheet.css'

export default function HeroSheet(props) {




    const acts = (hero) => hero.actions.map((action) => 
            <button disabled={!hero.isTurnActive} style={{display: 'block'}} onClick={() => action.onExecute(props.game.sceneManager.current_scene.enemies[0])}>{action.name}</button>
        )
        
  
    const characterSheet = props.game.getHeroes().map((hero) =>
        <div className="character-sheet">
            <div >Name: {hero.name}</div>
            {acts(hero)}
            <div >strength: { hero.strength }</div>
            <div >dexterity: { hero.dexterity }</div>
            <div >constitution: { hero.constitution }</div>
            <div >intelligence: { hero.intelligence }</div>
            <div >charisma: { hero.charisma }</div>
        </div>
        );
    

    return (
        <div>
            <div>{characterSheet}</div>
        </div>
    )

}