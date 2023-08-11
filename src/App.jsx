import { useState } from 'react'
import './App.css'
import Dice from './components/Dice'

function App() {

  // Initialize dice value state, on render, allNewDice() is called
  const [dice, setDice] = useState(allNewDice())

  // Function to randomly generate the dice numbers
  function allNewDice() {
    let newDice = []
    for (let i = 0; i <= 9; i++) {
      newDice.push({value: Math.floor(Math.random() * 6 + 1), isHeld: false})
    }
    return newDice
  }

  // Mapping over the dice array to display a <Dice /> with each num 
  const diceElements = dice.map(die => <Dice value={die.value}/>)

  function rollDice() {
    setDice(allNewDice())
  }

  return (
    <>
      <h1 className="title"> Welcome to Tenzies! </h1>
      <main>
        <div className="dice--container">
          {diceElements}
        </div>
        <button onClick={rollDice} className="roll-dice"> Roll </button>
      </main>
    </>
  )
}

export default App
