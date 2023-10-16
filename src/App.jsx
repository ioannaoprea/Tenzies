import React from "react"
import Confetti from "react-confetti"
import Die from "./components/die"
import { useState, useEffect } from "react"
import {nanoid} from "nanoid"

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCount, setRollCount] = useState(0)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let intervalId
    if(!tenzies) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000);
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [tenzies])

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    
    if(allHeld && allSameValue) {
      setTenzies(true)
      localStorage.setItem("bestTime", time)
    }
  },[dice, time])

  function generateNewDice() {
    return {
      value: Math.floor(Math.random()*6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }
  
  function allNewDice() {
    const newDice =[]
    for (let i=0; i<10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice
  }

  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die =>{
        return die.isHeld ?
          die : generateNewDice() 
      }))
      setRollCount(prevCount => prevCount + 1)
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setRollCount(0)
      setTime(0)
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} : die
    }))
  }

  
  const diceElements = dice.map(die => <Die 
    key={die.id} 
    value={die.value} 
    isHeld={die.isHeld} 
    holdDice={() => holdDice(die.id)}
  />)

  return (
    <main>
      {tenzies && <Confetti/>}

      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      
      <button onClick={rollDice} className="roll-dice">{tenzies ? "New Game" : "Roll Dice"}</button>
      <p>Roll Count: {rollCount}</p>
      <p>Time: {time} seconds</p>
    </main>
  )

}

// to add - css (real dost on the dice)
