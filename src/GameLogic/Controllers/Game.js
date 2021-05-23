import Hero from '../Classes/Hero'

const Game = {
    names: ['varne', 'felen', 'elumbar', 'ingos'],


    GetRandomName() {
        let randomN = Math.floor((Math.random() * this.names.length) + 1)
        console.log('random N ', randomN)
        return this.names.splice(randomN,1)[0]
    },

    GetHeroes(){
        return [
            new Hero(this.GetRandomName()), 
            new Hero(this.GetRandomName()), 
            new Hero(this.GetRandomName()), 
            new Hero(this.GetRandomName())
        ]
    }

}

export default Game