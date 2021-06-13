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
    this.state = {
      isLoading: false
    }
  }
 
  componentDidMount() {
    this.GameInstance.sceneManager.loading = () => this.setState({ isLoading: true})
    this.GameInstance.sceneManager.doneLoading = () => this.setState({ isLoading: false})
}

  render() {
    return (
      <div className="main-content">
        {/* SceneManager needs to invoke setState call back on Scene Area on changeScene() */}
        {/*  optionally conditionaly unmount SceneArea */}
        { !this.state.isLoading &&
          <ScenceArea game={this.GameInstance}></ScenceArea>
        }
      </div>
    );
  }
}

export default App;
