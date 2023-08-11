import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Dice from './components/Dice'

function App() {

  // Initialize dice value state, on render, allNewDice() is called
  const [dice, setDice] = useState(allNewDice())

  // Winner State
  const [tenzies, setTenzies] = useState(false)

  // Helper function for reusability
  function generateNewDice() {
    return {
        value: Math.ceil(Math.random() * 6), 
        isHeld: false, 
        id: nanoid()
    }
  }

  // Function to randomly generate the dice numbers
  function allNewDice() {
    let newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
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
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? {...die} : generateNewDice()
    }))
  }

  // Function to hold the dice when it is clicked
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      }))
    }

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)  
    const val = dice[0].value
    const sameValue = dice.every(die => die.value === val)
    if (allHeld && sameValue) {
      setTenzies(true)
      console.log("winner")
    }
  }, [dice])

  return (
    <>
      <h1 className="title"> Welcome to Tenzies! </h1>
      <h4 className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h4>
      <main>
        <div className="dice--container">
          {diceElements}
        </div>
        <button onClick={rollDice} className="roll-dice"> {tenzies ? "Roll" : "New Game"} </button>
      </main>
    </>
  )
}

export default App
