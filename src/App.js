import  React  from 'react';
import Game from './GameLogic/Controllers/Game'
import SceneArea from './Components/SceneArea/SceneArea';
import './App.css'

class App extends React.Component 
{
  constructor(props) {
    super(props)
    this.GameInstance = new Game()
    window.game = this.GameInstance
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
        { !this.state.isLoading &&
          <SceneArea game={this.GameInstance}></SceneArea>
        }
        { this.state.isLoading &&
          <div>Loading</div>      
        }
      </div>
    );
  }
}

export default App;
