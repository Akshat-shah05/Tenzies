import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Dice from './components/Dice'

function App() {

  // Initialize dice value state, on render, allNewDice() is called
  const [dice, setDice] = useState(allNewDice())

  // Function to randomly generate the dice numbers
  function allNewDice() {
    let newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6), 
        isHeld: false, 
        id: nanoid()
      })
    }
    return newDice
  }

  // Mapping over the dice array to display a <Dice /> with each num 
  const diceElements = dice.map(die => <Dice 
    value={die.value} 
    key={die.id}
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)}
    />)

  // Function to roll the dice (setDice again) onClick
  function rollDice() {
    setDice(allNewDice())
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      }))
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
