import  React  from 'react';
import Game from './GameLogic/Controllers/Game'
import HeroSheet from './Components/HeroSheet'

class App extends React.Component 
{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Characters</h1>
        <HeroSheet game={Game} ></HeroSheet>
      </div>
    );
  }
}

export default App;
