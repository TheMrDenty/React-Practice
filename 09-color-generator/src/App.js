import React, { useState } from 'react'
import SingleColor from './SingleColor'

import Values from 'values.js'



function App() {
  const [color, setColor] = useState('');
  const [gradient, setGradient] = useState(10)
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values('#f15025').all(gradient));

  let length = list.length;
  /* console.log(Math.ceil(length / 2)); */

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      let colors = new Values(`#${color}`).all(parseInt(gradient));
      console.log(gradient);
      setList(colors)
    } catch (error) {
      setError(true);
      
    }
    
    
  }


  const getRandomHex = () => {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = '';
    // loops 6 times and adds a random value from hex array
    // using getRandomNumber function
    for(let i=0; i<6; i++) {
        hexColor += hex[Math.floor(Math.random() * hex.length)];
        // shows hexColor being built
        console.log(hexColor)
    }
    return hexColor;
  }



  return (
    <>
    <h3>color generator</h3>
      <section className='container'>
        <form onSubmit={handleSubmit}>
          
          <label for='hex'>hex value: </label>
          <span className={`input-container ${error?'error':null}`}>
            #
            <input 
              type='text' 
              value={color} 
              onChange={(e)=> setColor(e.target.value)} 
              placeholder='f15025' 
              id='hex'
            />
          </span>
          
          <label for='gradient'>gradient: </label>
          <span className='input-container'  >
            <input 
              type='text' 
              name='percentage'
              value={gradient} 
              onChange={(e)=> parseInt(setGradient(e.target.value))} 
              placeholder='10' 
              
              id='gradient'
            />
            %
          </span>
          <button className='btn' onClick={() => setColor(getRandomHex())} type='submit'>
            generate random color
          </button>
          <button className='btn' type='submit'>
            submit
          </button>
        </form>

      </section>
      <section className='colors'>
        {list.map((color, index)=>{
          /* console.log(color); */
          return <SingleColor key={index} {...color} length={length} gradient={gradient}  index={index} hexColor={color.hex} />
        })}
      </section>
    </>
  )
}

export default App
