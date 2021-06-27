import React from 'react';
import { Observer } from 'mobx-react-lite';
import  { SceneArea } from './Components/SceneArea/SceneArea';
import './App.css'

function App() {
  return (
    <Observer>{() => <SceneArea/>}</Observer>
  )
}

export default App;
