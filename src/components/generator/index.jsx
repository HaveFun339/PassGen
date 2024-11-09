import React, { useState, useRef } from 'react';
import { FaCopy } from "react-icons/fa";
import './index.css';
export const Generator = () => {
  const [characterLength, setCharacterLength] = useState(10);
  const [password, setPassword] = useState("PTx1f5DaFX");

  const [difficulty, setDifficulty] = useState(["EASY", "MEDIUM", "HARD"]);
  const handleRangeChange = (event) => {
    setCharacterLength(parseInt(event.target.value));
  };

  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  function passwordGenerate(lengthPass, lower, upper, number, special) {
    let pass = ""
    for (let i = 0; i < lengthPass; i++) {
      const rand1 = Math.floor(Math.random() * lowercaseChars.length);
      const rand2 = Math.floor(Math.random() * uppercaseChars.length);
      const rand3 = Math.floor(Math.random() * numberChars.length);
      const rand4 = Math.floor(Math.random() * specialChars.length);

      if (lower) {
        pass += lowercaseChars[rand1];
      }
      if (upper) {
        pass += uppercaseChars[rand2];
      }
      if (special) {
        pass += specialChars[rand4];
      }
      if (number) {
        pass += numberChars[rand3];
      }
    }

    setPassword(pass.slice(0, lengthPass)) 
  }
  const [count, setCount] = useState({
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  function getDifficulty() {
    const selectedOptions = Object.values(count).filter(Boolean).length; // Count selected checkboxes
  if (characterLength <= 8 && selectedOptions <= 2) {
    return "EASY";
  } else if (characterLength <= 12 && selectedOptions >= 2 && selectedOptions <= 3) {
    return "MEDIUM";
  } else {
    return "HARD";
  }
  } 
  let hardlevel = count.upper + count.lower + count.number + count.special 
  function getColor() {
    switch (hardlevel) {
      case 1:
        return "#F64A4A"
        

      case 2:
        return "#FB7C58"

      case 3:
        return "#F8CD65"

      case 4:
        return "#A4FFAF"


      default:
        break;
    }
  }
  let color = getColor()
  const ref1 = useRef(null)
  return (
    <>

      <div className="generator">
        <div className="password">Password Generator</div>
        <div className="flex">
          <input className="passwordVisible" ref={ref1} type="text" value={password} readonly /><FaCopy className='facopy' onClick={() => {
            ref1.current.select()
            document.execCommand('copy');
          }} fill="#A7DCB3" />
        </div>

        <div className="container">
          <div className="characterlength">
            <span>Character Length</span>
            <div id="value" className="numberlength">{characterLength}</div>
          </div>
          <input
            type="range" min={4} max={15} value={characterLength} onChange={handleRangeChange} className="accent" id="pi_input" />
          <p className='p'>
            <div className="checkbox"> </div> <input onClick={() => setCount({ ...count, upper: !count.upper })} type="checkbox" className="checkbox0" />Include Uppercase Letters
            <div className="checkbox1">
              <input onClick={() => setCount({ ...count, lower: !count.lower })} type="checkbox" className="checkbox0" />Include Lowercase Letters
            </div>
            <div className="checkbox2">
              <input onClick={() => setCount({ ...count, number: !count.number })} type="checkbox" className="checkbox0" />Include Numbers
            </div>
            <div className="checkbox3">
              <input onClick={() => setCount({ ...count, special: !count.special })} type="checkbox" className="checkbox0" />Include Symbols
            </div>
          </p>
          <p>
            <div className="difficulty">
              <div className="strange">STRENGTH</div>
              <div className="medium"> {getDifficulty(  ) }<div className="pryami"></div>
                <div style={{ background: hardlevel >= 1 && color, borderColor: hardlevel >= 1 && color }} className="pryamo"></div>
                <div style={{ background: hardlevel >= 2 && color, borderColor: hardlevel >= 2 && color }} className="pryamo1" ></div>
                <div style={{ background: hardlevel >= 3 && color, borderColor: hardlevel >= 3 && color }} className="pryamo2" ></div>
                <div style={{ background: hardlevel >= 4 && color, borderColor: hardlevel >= 4 && color }} className="pryamo3" ></div></div>

            </div>
            <div onClick={()=>passwordGenerate(characterLength,count.lower,count.upper,count.number,count.special)} className="generate">GENERATE</div>
          </p>
        </div>
      </div>
    </>
  );
};
// ізі коли до 8 символів і до 2 галочок
// медіум коли від 8 до 12 символів і 2-3 галочки
// хард коли від 12 символів і 4 галочки