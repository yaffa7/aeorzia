import  React  from 'react';
import Game from './GameLogic/Controllers/Game'
import HeroSheet from './Components/HeroSheet'
import Roller from './Components/Roller';
import ScenceArea from './Components/ScenceArea';
import './App.css'

class App extends React.Component 
{
  constructor(props) {
    super(props)
    this.GameInstance = new Game()
    console.log(this.GameInstance)
  }

  render() {
    return (
      <div className="main-content">
        <Roller></Roller>
        <ScenceArea></ScenceArea>
        <HeroSheet game={this.GameInstance} ></HeroSheet>
      </div>
    );
  }
}

export default App;
