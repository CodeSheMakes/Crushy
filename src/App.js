import React, { useEffect, useState } from "react";
import ScoreBoard from './components/ScoreBoard.js'
import mallow from  './images/Mallow.png';
import drop from './images/Droplet.png';
import heart from './images/Heart.png';
import leaf from './images/Leaf.png';
import flower from './images/Flower.png';
import sun from './images/Sun.png';
import blank from './images/blank.png';

const width = 8
const candyColors = [
  mallow, 
  drop,
  heart,
  leaf,
  flower,
  sun
]

// 'mistyrose', marshmallow
//   'steelblue', droplet
//   'rosybrown', heart
//   'mediumaquamarine', leaf
//   'mediumpurple', flower
//   'navajowhite' sun


const App = () => {

  const[currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [ squareBeingDragged, setSquareBeingDragged ] = useState(null)
  const [ squareBeingReplaced, setSquareBeingReplaced ] = useState(null)
  const [ scoreDisplay, setScoreDisplay ] = useState(0)
  


  const checkForColumnFour = () => {
    for ( let i = 0; i <= 39; i++ ) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if ( columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank) ) {
        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
        
      }
    }
  };

  const checkForColumnThree = () => {
    for ( let i = 0; i <= 47; i++ ) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if ( columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank) ) {
        setScoreDisplay((score) => score + 3)
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  };


  const checkForRowFour = () => {
    for ( let i = 0; i < 64; i++ ) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      const isBlank = currentColorArrangement[i] === blank
      if (notValid.includes(i)) continue

      if ( rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank) ) {
        setScoreDisplay((score) => score + 4)
        rowOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  };


  const checkForRowThree = () => {
    for ( let i = 0; i < 64; i++ ) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const isBlank = currentColorArrangement[i] === blank
      if (notValid.includes(i)) continue

      if ( rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank) ) {
        setScoreDisplay((score) => score + 3)
        rowOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  };


  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4 ,5, 6, 7]
      const isFirstRow = firstRow.includes(i)

        if (isFirstRow && currentColorArrangement[i] === blank) {
          let randomNumber = Math.floor(Math.random() * candyColors.length)
          currentColorArrangement[i] = candyColors[randomNumber]
        }

        if ((currentColorArrangement[i + width]) === blank) {
          currentColorArrangement[i + width] = currentColorArrangement[i]
          currentColorArrangement[i] = blank
        }
    }
  }

  console.log(scoreDisplay)

  const dragStart = (e) => {
    setSquareBeingDragged(e.target)
  }

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
  }


  const dragEnd = () => {
    
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')

    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')
  
    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    const isColFour = checkForColumnFour()
    const isRowFour = checkForRowFour()
    const isColThree = checkForColumnThree()
    const isRowThree = checkForRowThree()

    if (squareBeingReplacedId && validMove && 
      (isRowThree || isRowFour || isColFour || isColThree)) {
        setSquareBeingDragged(null)
        setSquareBeingReplaced(null)
      } else {
        currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')

        currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
        setCurrentColorArrangement([...currentColorArrangement])
      }
  }


  const createBoard = () => {
    const randomColorArrangment = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangment.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangment);
}

    useEffect(() => {
      createBoard()
    }, []);

    

    useEffect(() => {
      const timer = setInterval(() => {
        
        // const checkForColumnFour = () => {
        //   for ( let i = 0; i < 39; i++ ) {
        //     const columnOfFour = [i, i + width, i + width * 3]
        //     const decidedColor = currentColorArrangement[i]
      
        //     if ( columnOfFour.every(square => currentColorArrangement[square] === decidedColor) ) {
        //       columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        //     }
        //   }
        // };
      
        // const checkForColumnThree = () => {
        //   for ( let i = 0; i < 47; i++ ) {
        //     const columnOfThree = [i, i + width, i + width * 2]
        //     const decidedColor = currentColorArrangement[i]
      
        //     if ( columnOfThree.every(square => currentColorArrangement[square] === decidedColor) ) {
        //       columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        //     }
        //   }
        // };
      
        checkForColumnFour()
        checkForRowFour()
        checkForColumnThree()
        checkForRowThree()
        moveIntoSquareBelow()
        setCurrentColorArrangement([...currentColorArrangement])
      }, 100);
      return () => clearInterval(timer)
    }, [checkForColumnFour, checkForRowFour, checkForColumnThree, checkForRowThree, moveIntoSquareBelow, currentColorArrangement]);


console.log(currentColorArrangement);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
          <ScoreBoard score={scoreDisplay}/>
    </div>
  );
}

export default App;
