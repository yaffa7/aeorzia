import React from 'react'

export default function HeroSheet(props) {


    const characterSheet = props.game.GetHeroes().map((hero, index) =>
        <div>
            <div key={index}>Name: {hero.name}</div>
            <div key={index}>strength: { hero.strength }</div>
            <div key={index}>dexterity: { hero.dexterity }</div>
            <div key={index}>constitution: { hero.constitution }</div>
            <div key={index}>intelligence: { hero.intelligence }</div>
            <div key={index}>charisma: { hero.charisma }</div>
            <br/>
        </div>
        );
    


    return (
        <div>
            <h1>HeroSheet!</h1>
            <div>{characterSheet}</div>
        </div>
    )

}