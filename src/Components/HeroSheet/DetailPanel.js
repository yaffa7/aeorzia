
const DetailPanel = (props) => {

    const activePanel = () => {
        if (props.activePanel === 'skills') {
            return (
                <>
                    {props.hero.skills.map(s => (
                        <button>{s.skillName}</button>
                    ))}
                </>
            )
        }
        if (props.activePanel === 'items') {
            return (
                <>
                    {props.hero.items.map(i => (
                        <button>{i.name}</button>
                    ))}
                </>
            )
        }
        if(props.activePanel ==='details') {
            return (
                <>
                   <div>{'STR:' + props.hero.strength + ' DEX:' + props.hero.dexterity + ' CON:' + props.hero.constitution + " INT:" + props.hero.intelligence + " CHAR:" + props.hero.charisma}</div>
                </>
            )
        }
    }
    return (
        <>
            <strong>{props.activePanel}</strong>
            <br />
            {activePanel()}
        </>
    )
}

export default DetailPanel