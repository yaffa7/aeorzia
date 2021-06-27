import React from 'react';
import { useObserver } from 'mobx-react-lite';
import  { SceneArea } from './Components/SceneArea/SceneArea';
import './App.css'

function App() {
  return useObserver(() => (
    <>
        <SceneArea/>
    </>
  ));
}

export default App;
