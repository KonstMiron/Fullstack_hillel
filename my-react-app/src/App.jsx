import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MassageComponent from './components/MessageComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MassageComponent/>
    </>
  )
}

export default App
