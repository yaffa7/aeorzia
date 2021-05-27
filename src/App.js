import  React  from 'react';
import Game from './GameLogic/Controllers/Game'
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
        <ScenceArea game={this.GameInstance}></ScenceArea>
      </div>
    );
  }
}

export default App;
