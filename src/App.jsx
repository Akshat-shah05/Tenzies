import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Dice from './components/Dice'
import Confetti from 'react-confetti'

function App() {

  // Initialize dice value state, on render, allNewDice() is called
  const [dice, setDice] = useState(allNewDice())

  // Winner State
  const [tenzies, setTenzies] = useState(false)

  // Track number of rolls
  const [rolls, setRolls] = useState(0)

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
    setRolls(prev => prev + 1)
    if (tenzies) {
      setTenzies(prev => !prev)
      setDice(allNewDice())
      setRolls(0)
    }
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
      {tenzies && <Confetti />}
      <h1 className="title"> Welcome to Tenzies! {rolls} </h1>
      <h4 className="instructions">
        {tenzies 
        ?
        "Congratulations!"
        :
        "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."
        }
      </h4>
      <h5 className="roll-num">Rolls: {rolls}</h5>
      <main>
        <div className="dice--container">
          {diceElements}
        </div>
        <button onClick={rollDice} className="roll-dice"> {tenzies ? "New Game" : "Roll"} </button>
      </main>
    </>
  )
}

export default App
