
var canvas = document.getElementById("gameCanvas");
var gameOverButton = document.getElementById("reset");
var scoreMessage = document.querySelector("p");

var ctx = canvas.getContext("2d");
var snake = [[225,225],[210,225],[195,225]];
var curDirection = "EAST";
var changeDirection;
var foodLocation;
var gameEnd = false;
var score = 0;
var gameSpeed = 100;

// board coordinates goes from 0,15,30... to ... 405,420,435(XY) //

function main(){
	if(gameEnd == false){
		setTimeout(function onTick(){
			advanceSnake();
			changeDirection = 0; // alows player to change direction 
			drawSnake();
			// console.log("X" + snake[0][0] + "," + "Y" + snake[0][1] + " " + changeDirection)
			main();
		}, gameSpeed)
	}
}


function drawSnakePart(snakePart, toggle){ // draws a block on the canvas in the argument form ([x,y], draw snake/erase/draw food)
	if(toggle == "draw"){
		ctx.fillStyle = 'lightgreen';
		ctx.strokeStyle = "rgb(18, 18, 18)";
	} else if(toggle == "erase"){
		ctx.fillStyle = "rgb(18, 18, 18)";
		ctx.strokeStyle = "rgb(18, 18, 18)";
	} else if(toggle == "food"){
		ctx.fillStyle = "rgb(196, 8, 8)";
		ctx.strokeStyle = "rgb(18, 18, 18)";
	}
	ctx.fillRect(snakePart[0],snakePart[1], 15, 15);
	ctx.strokeRect(snakePart[0],snakePart[1], 15, 15);
}

function drawSnake(){ // draw out snake on canvas
	for(var i=0;i<snake.length;i++){
		drawSnakePart(snake[i], "draw");
	}
}

function advanceSnake(){ // move snake forward and check for special conditions
	var newHeadCoordinate = newHead(); // get coordinates of new head depending on direction
	snake.unshift(newHeadCoordinate);

	// if next move goes out of border
	borderTest(newHeadCoordinate);

	// if collision
	if(collisionTest(newHeadCoordinate)){ // game end
		console.log("END");
		gameEnd = true;
		gameOver();
	}

	// if next move is FOOD
	if(newHeadCoordinate[0] === foodLocation[0] && newHeadCoordinate[1] === foodLocation[1]){
		newFood();
		score++;
		if(score % 2 == 0){ // for every 2 score you get the snake speeds up
			gameSpeed -= 1;
		}
	} else { // if it touches food, then it doesn't remove the last tail, effectively growing it
		drawSnakePart(snake[snake.length - 1], "erase");
		snake.pop(); 
	}

}

function newHead(){ // head of the snake, coords of the newest part of the snake
	let oldx = snake[0][0], oldy = snake[0][1];
	var newHead;

	if(curDirection === "NORTH"){
		newHead = [oldx, oldy - 15];
	}
	if(curDirection === "SOUTH"){
		newHead = [oldx, oldy + 15];
	}
	if(curDirection === "EAST"){
		newHead = [oldx + 15, oldy];
	}
	if(curDirection === "WEST"){
		newHead = [oldx - 15, oldy];
	}

	return newHead;
}

function newFood(){ 
	while(true){
		var inSnake = false;
		var randx = Math.floor(Math.random() * 29) * 15;
		var randy = Math.floor(Math.random() * 29) * 15;
		for(var i=0;i < snake.length; i++){
			if(randx === snake[i][0] && randy === snake[i][1]){ // if the food is INSIDE the snake, then break 	
				inSnake = true;									// and try a new location
				break;
			}
		}

		if(inSnake === false){
			foodLocation = [randx,randy];
			drawSnakePart(foodLocation, "food");
			break;
		}
	}
}

function collisionTest(newHeadCoordinate){
	for(var i=3;i < snake.length; i++){
		if(newHeadCoordinate[0] === snake[i][0] && newHeadCoordinate[1] === snake[i][1]){ 
			return true;
		}
	}
	return false;
}

function borderTest(newHeadCoordinate){
	if(newHeadCoordinate[0] === 450){ // goes out RIGHT border
		newHeadCoordinate[0] = 0;
	}
	if(newHeadCoordinate[0] === -15){ // goes left LEFT border
		newHeadCoordinate[0] = 435;
	}
	if(newHeadCoordinate[1] === -15){ // goes out TOP border
		newHeadCoordinate[1] = 435;
	}
	if(newHeadCoordinate[1] === 450){ // goes out BOTTOM border
		newHeadCoordinate[1] = 0;
	}
}

function gameOver(){
	gameOverButton.style.display = "block";
	scoreMessage.textContent = "Your score is " + score
}

function resetGame(){
	score = 0;
	for(var i=0;i < snake.length; i++){
		drawSnakePart(snake[i], "erase");
	}
	snake = [[225,225],[210,225],[195,225]];
	curDirection = "EAST";
	gameEnd = false;
	gameOverButton.style.display = "none";
	gameSpeed = 100;
	main();
}

gameOverButton.addEventListener("click", resetGame);

window.addEventListener("keydown", function(event){

	if(changeDirection == true) { // if direction has already been changed in between steps
		return;
	}

	if(event.keyCode === 38 && curDirection != "SOUTH"){ // UP arrow key
		curDirection = "NORTH";
	}
	else if(event.keyCode === 40 && curDirection != "NORTH"){ // DOWN arrow key
		curDirection = "SOUTH";
	}
	else if(event.keyCode === 39 && curDirection != "WEST"){ // UP arrow key
		curDirection = "EAST";
	}
	else if(event.keyCode === 37 && curDirection != "EAST"){ // UP arrow key
		curDirection = "WEST";
	}
	else {
		return;
	}

	changeDirection = true; // direction has been changed

})

newFood();
main(); // initialize
