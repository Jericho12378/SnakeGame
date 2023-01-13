var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");
let snakeX = 24;
let snakeY = 150;
let snakeDirection = "right";
let gameOver = false;
let score = 0
let gameScore = document.getElementById("score");
let highestScore = document.getElementById("highestScore")
let previousScore = localStorage.getItem("score")
let snake = [
    {x:10, y:10},
    {x:0, y:0},
    {x:0, y:0}
]
let food = {
    x:240,
    y:320
}

setInterval(update, 100)
highestScore.innerHTML += previousScore
function update() {
  
  if (gameOver) return;
    let snakeHead = snake[0]
   
  switch (snakeDirection) {
    case "right":
      snakeHead.x += 10;
      break;
    case "left":
      snakeHead.x -= 10;
      break;
    case 'up':
        snakeHead.y -= 10;
      break;
    case 'down':
        snakeHead.y += 10;
        break;
  }
  if (snakeHead.x < 0 || snakeHead.x >= canvas.width || snakeHead.y < 0 
    || snakeHead.y >= canvas.height){
      gameOver = true
      console.log(snakeHead.x)
      console.log(snakeHead.y)
     // alert("Game Over")
      restartGame()
    }
  if(snakeHead.x === food.x && snakeHead.y === food.y){
    score++
    let topScore
    if(previousScore <= score){
      topScore = score
      localStorage.setItem("score", topScore)
    }

    food = {
        x: Math.floor(Math.random() * 400 / 10) * 10,
        y: Math.floor(Math.random() * 400 / 10) * 10
    }
    
    let lastSegment = snake[snake.length - 1]
    snake.push({x: lastSegment.x, y:lastSegment.y})
  }
  
  for(let i = snake.length - 1; i > 0; i--){
        snake[i] = {...snake[i-1]}
  }
  snake[0] = snakeHead

  context.clearRect(0,0,400,400)
  context.fillStyle = "black";
  snake.forEach(segment => {
    context.fillRect(segment.x, segment.y, 10, 10);
});
 context.fillStyle = "red"
 context.fillRect(food.x,food.y,10,10)
 gameScore.innerHTML = "Score: " + score
 
}



window.addEventListener('keydown', function(event){
    switch(event.key){
        case 'ArrowRight':
            snakeDirection = 'right'
            break
        case 'ArrowLeft':
            snakeDirection = 'left'
            break
        case 'ArrowUp':
            snakeDirection = 'up'
            break
        case 'ArrowDown':
            snakeDirection = 'down'
            break
    }
})
function pause(){
  
  let pause__btn = document.getElementById("pause__button")
  if(pause__btn.innerHTML == "Pause"){
    gameOver = !gameOver
    pause__btn.innerHTML = "Play"
  }else{
    gameOver = !gameOver
    pause__btn.innerHTML = "Pause"
  }
}
function play(){
  location.reload()
}

function restartGame(){
  document.getElementById("pause__button").hidden = true
  let play__btn =  document.getElementById("play__button");
  play__btn.disabled = false
  play__btn.style.width = "20%"
  setTimeout(() => {
    play__btn.style.width = "90%";
    
}, 500);
}
