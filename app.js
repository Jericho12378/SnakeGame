var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");
let snakeX = 24;
let snakeY = 150;
let snakeDirection = "right";

context.fillStyle = "red";
context.fillRect(250, 210, 18, 18);

context.fillStyle = "black";
let snake = [
    {x:10, y:10},
    {x:0, y:0},
    {x:0, y:0}
]
let food = {
    x:240,
    y:320
}
setInterval(update, 50)

function update() {
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
  if(snakeHead.x === food.x && snakeHead.y === food.y){
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
  snake.forEach(segment => {
    context.fillRect(segment.x, segment.y, 10, 10);
});
 context.fillRect(food.x,food.y,10,10)
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
