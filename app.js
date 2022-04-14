const gameBoard = document.querySelector("#game");
let ctx = gameBoard.getContext('2d');
const unit = 25;
const height = 1000;
const width = 1000;
let running= false;
let foodX;
let foodY;
const tickspeed=50;
let verticalSpeed = 0;
let horizontalSpeed = 0;
let points = 0;
document.getElementById("points").textContent = "Score: "+points;
window.addEventListener('keydown', setDirection);
function setDirection(key){
    switch(true) {
        case (key.code == 'ArrowUp' && verticalSpeed == 0):
            verticalSpeed = -unit;
            horizontalSpeed = 0;
            break;
        case (key.code == 'ArrowLeft' && horizontalSpeed == 0):
            verticalSpeed = 0;
            horizontalSpeed = -unit;
            break;
        case (key.code == 'ArrowDown' && verticalSpeed == 0):
            verticalSpeed = unit;
            horizontalSpeed = 0;
            break;
        case (key.code == 'ArrowRight' && horizontalSpeed == 0):
            verticalSpeed = 0;
            horizontalSpeed = unit;
            break;
    }
};
let snake = [
    {x:width/2, y:height/2},
    {x:width/2+unit, y:height/2},
    {x:width/2+unit * 2, y:height/2},
    {x:width/2+unit * 3, y:height/2}
];
function clearGameField(){
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, width, height);
};
function drawSnake() {
    ctx.fillStyle = "red";
    ctx.fillRect(snake[0].x, snake[0].y, unit, unit);
    for(let i=1; i<snake.length; i++) {
        ctx.fillStyle = "blue";
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    }
};
function newFood(){
    function rFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unit) * unit;
        return randNum;
    }
    foodX = rFood(0, width - unit);
    foodY = rFood(0, width - unit);
};
function drawFood(){
    ctx.fillStyle = "green";
    ctx.fillRect(foodX, foodY, unit, unit);
};
function stopGame(){
    running=false;
}
function startGame(){
    if(!running) {
    verticalSpeed = 0;
    horizontalSpeed = -unit;
    snake = [
        {x:width/2, y:height/2},
        {x:width/2+unit, y:height/2},
        {x:width/2+unit * 2, y:height/2},
        {x:width/2+unit * 3, y:height/2}
    ];
    running = true;
    newFood();
    gameTick(tickspeed);
    }
};
function stopGame(){
    running = false;
};
function snakeMove() {
        let snakeHead = {x:snake[0].x+horizontalSpeed, y:snake[0].y+verticalSpeed};
        snake.unshift(snakeHead);

        if(snake[0].x == foodX && snake[0].y == foodY){
            points++;
            document.getElementById("points").textContent = "Score: "+points;
            newFood();
        } else
        snake.pop();
};
function SnakeAlive() {
        if(snake[0].x < 0 || snake[0].x > width) {
            running = 0;
        }
        if (snake[0].y < 0 || snake[0].y > height) {
            running = 0;
        }

        for(let i = 1; i<snake.length; i++) {
            if(snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
                running=0;
            }
        }

};
function gameTick(tickspeed) {
     if(running){
        setTimeout(()=>{
            SnakeAlive();
            clearGameField();
            drawSnake();
            snakeMove();
            drawFood();
            gameTick(tickspeed);
        }, tickspeed);
    }
};