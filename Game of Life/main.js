let lng = 'eng';


var table = document.getElementsByTagName('table')[0];

var squares = document.getElementsByTagName('td');
var genValue = document.getElementById('genValue');




var buttons = document.getElementsByTagName('button');

if (buttons[0].innerHTML == 'Jouer') {
	lng = 'fra';
}


for (i = 0; i < buttons.length - 12; i++) {     //// placing animation buttons
	buttons[i].style.left = (i * 130).toString() + 'px';
	buttons[i].style.marginLeft = '35px';
}


for (i = 0; i < 12; i++) {             //// placing patterns buttons
	buttons[i + 5].style.left = (110 * (i % 4) + 20).toString() + 'px';	
	buttons[i + 5].style.top = (80 * Math.floor(i / 4) + 100).toString() + 'px';
	buttons[i + 5].style.width = '100px';
	buttons[i + 5].style.height = '60px';
	buttons[i + 5].style.fontSize = '16px';
}


var playButton = document.getElementById('playButton');
var clearButton = document.getElementById('clearButton');
var oneGenButton = document.getElementById('oneGen');
var initializeButton = document.getElementById('initializeButton');
var figuresButton= document.getElementById('figuresButton');
var planeurHDButton = document.getElementById('planeurHDButton');
var planeurHGButton = document.getElementById('planeurHGButton');
var planeurBDButton = document.getElementById('planeurBDButton');
var planeurBGButton = document.getElementById('planeurBGButton');
var canonPlaneursHDButton = document.getElementById('canonPlaneursHDButton');
var canonPlaneursHGButton = document.getElementById('canonPlaneursHGButton');
var canonPlaneursBDButton = document.getElementById('canonPlaneursBDButton');
var canonPlaneursBGButton = document.getElementById('canonPlaneursBGButton');
var vaisseauDButton = document.getElementById('vaisseauDButton');
var vaisseauGButton = document.getElementById('vaisseauGButton');
var vaisseauHButton = document.getElementById('vaisseauHButton');
var vaisseauBButton = document.getElementById('vaisseauBButton');






var figures = document.getElementById('figures');


figures.style.height = ((buttons.length - 5) / 2 * 35 + 30).toString() + 'px';
console.log(figures.style.height)


var planeurHD = [
					[1,1,1],
					[0,0,1],
					[0,1,0]
				];


var planeurHG = inverse(planeurHD, 'HG');
var planeurBD = inverse(planeurHD, 'BD');
var planeurBG = inverse(planeurHD, 'BG');

var canonPlaneursHD = [
						[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
						[1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
						[1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
						[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0]
					];
var canonPlaneursHG = inverse(canonPlaneursHD, 'HG');
var canonPlaneursBD = inverse(canonPlaneursHD, 'BD');
var canonPlaneursBG = inverse(canonPlaneursHD, 'BG');

var vaisseauD = [
					[0,0,0,1,0],
					[0,0,0,0,1],
					[1,0,0,0,1],
					[0,1,1,1,1]
				];



var vaisseauG = inverse(vaisseauD, 'HG');
var vaisseauH = [
					[0,0,1,0],
					[0,0,0,1],
					[0,0,0,1],
					[1,0,0,1],
					[0,1,1,1]
				];
var vaisseauB = inverse(vaisseauH, 'BD');

var figuresData = [planeurHD, planeurHG, planeurBD, planeurBG, canonPlaneursHD, canonPlaneursHG, canonPlaneursBD, canonPlaneursBG, vaisseauD, vaisseauG, vaisseauH, vaisseauB];
// planeur HD, planeur HG, planeur BD, planeur BG, canon à planeurs HD, canon à planeurs HG, canon à planeurs BD, canon à planeurs BG

playButton.addEventListener('click', play);
clearButton.addEventListener('click', clear);
oneGenButton.addEventListener('click', playOneGen);
initializeButton.addEventListener('click', initializeBoard)
figuresButton.addEventListener('click', showFigures);
planeurHDButton.addEventListener('click', createFigure);
planeurHGButton.addEventListener('click', createFigure);
planeurBDButton.addEventListener('click', createFigure);
planeurBGButton.addEventListener('click', createFigure);
canonPlaneursHDButton.addEventListener('click', createFigure);
canonPlaneursHGButton.addEventListener('click', createFigure);
canonPlaneursBDButton.addEventListener('click', createFigure);
canonPlaneursBGButton.addEventListener('click', createFigure);
vaisseauDButton.addEventListener('click', createFigure);
vaisseauGButton.addEventListener('click', createFigure);
vaisseauHButton.addEventListener('click', createFigure);
vaisseauBButton.addEventListener('click', createFigure);


var board = [];
var initialBoard = [];

// var askRows = prompt("Dimensions de la grille ? (intervalle conseillé : 60-80)");
var rows = 80;
var cols = rows;

var speed = 1000;


var play = false;
var showFiguresTrueFalse = false;
var gen = 0;
var lastClickedSquare = '    ';


// var askRand = confirm("Voulez-vous une répartition préétablie et aléatoire des cellules sur la grille ?, cliquez 'ok' pour une répartition préétablie, sinon, 'annuler' pour une grille vierge");
//if (askRand) {var rand = true}
//else {rand = false}
var rand = true;


var freq = 2;

var clicked = false; 


if (speed <= 1000) {
	var interval = 1000 - speed;
}

else {
	var interval = 300;
}


function inverse(figureHD, dir) {
	var newFigureHD = [];

	for (var i = 0; i < figureHD.length; i++) {
		newFigureHD.push([]);
		for (var j = 0; j < figureHD[i].length; j++) {
			newFigureHD[i].push(figureHD[i][j]);
		}
	}

	if (dir == 'HG') {
		for (var i = 0; i < figureHD.length; i++) {
			newFigureHD[i].reverse();
		}
	}

	if (dir == 'BD') {
		newFigureHD.reverse();
	}

	if (dir == 'BG') {
		newFigureHD.reverse();
		for (var i = 0; i < figureHD.length; i++) {
			newFigureHD[i].reverse();
		}
	}

	return newFigureHD;
}

function clear() {
	var squaresNum = 0
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			board[i][j] = 0;
			squares[squaresNum].style.backgroundColor = 'white';
			squaresNum ++;
		}
	}
	gen = 0;
	genValue.innerHTML = gen;
	play = false;
	playButton.innerHTML = 'Play';

}

function initializeBoard() {
	clear()
	board = []
	play = false;
	playButton.innerHTML = 'Play';
	for (var i = 0; i < rows; i++) {
		board.push([]);
		for (var j = 0; j < cols; j++) {
			board[i].push(initialBoard[i][j]);
		}
	}

	drawBoard(board);
}

function showFigures() {
	if (showFiguresTrueFalse == true) {
		showFiguresTrueFalse = false;
		figures.className = 'hide';
	}

	else {
		showFiguresTrueFalse = true;
		figures.className = '';
	}
}

function createFigure() {
	showFiguresTrueFalse = false;
	figures.className = 'hide';
	var figNum = NaN;


	var row = parseInt(lastClickedSquare.slice(0, 2));
	var col = parseInt(lastClickedSquare.slice(2, 5));


	if (this == planeurHDButton) {
		figNum = 0;
	}

	if (this == planeurHGButton) {
		figNum = 1;
	}

	if (this == planeurBDButton) {
		figNum = 2;
	}

	if (this == planeurBGButton) {
		figNum = 3;
	}

	if (this == canonPlaneursHDButton) {
		figNum = 4;
	}

	if (this == canonPlaneursHGButton) {
		figNum = 5;
	}

	if (this == canonPlaneursBDButton) {
		figNum = 6;
	}

	if (this == canonPlaneursBGButton) {
		figNum = 7;
	}

	if (this == vaisseauDButton){
		figNum = 8;
	}

	if (this == vaisseauGButton){
		figNum = 9;
	}

	if (this == vaisseauHButton){
		figNum = 10;
	}

	if (this == vaisseauBButton){
		figNum = 11;
	}



	if (clicked == true) {
		for (var i = 0; i < figuresData[figNum].length; i++) {
			for (var j = 0; j < figuresData[figNum][i].length; j++) {
				board[i + row][j + col] = figuresData[figNum][i][j];
				
			}
		}
	
		click = false;
		drawBoard(board);
	}
	
}

function createBoard(rows, cols) {
	var row = -1;
	var col = 0;
	for (var i = 0; i < rows; i++) {
		var newRow = document.createElement('tr');
		table.appendChild(newRow);
		board.push([])
		row ++;
		col = 0;
		for (var j = 0; j < cols; j++) {
			var newSquare = document.createElement('td');
			newSquare.addEventListener('click', animateSquare);
			newRow.appendChild(newSquare);
			newSquare.id = row.toString() + ' ' + col.toString() + '  ';
			if (rand == true) {
				if (Math.floor(Math.random() * freq) == 1) {
				board[i].push(1);
				}

				else {
				board[i].push(0);
				}
			}

			else {
				board[i].push(0);
			}
			col ++;
			
		}
	}
	return board;
}

function animateSquare() {
	var squaresNum = 0;

	if (this.style.backgroundColor == 'black') {
		this.style.backgroundColor = 'white';
	} else {
		this.style.backgroundColor = 'black';
	}
 	
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			if (squares[squaresNum].style.backgroundColor == 'black') {
				board[i][j] = 1;
			} else {
				board[i][j] = 0;
			}

			squaresNum ++;
		}
	}

	lastClickedSquare = this.id;
	clicked = true;
}

function drawBoard(board) {
	var squaresNum = 0;
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			if (board[i][j] == 1) {
				squares[squaresNum].style.backgroundColor = 'black';
			}

			else {
				squares[squaresNum].style.backgroundColor = 'white';
			}

			squaresNum ++;
		}

	}
}

function newGen(board) {
	var oldBoard = [];
	var newBoard = [];
	for (var i = 0; i < rows; i++) {
		oldBoard.push([]);
		newBoard.push([]);
		for (var j = 0; j < cols; j++) {
			oldBoard[i].push(board[i][j]);
			newBoard[i].push(board[i][j]);
		}
	}
	for (var i = 1; i < rows - 1; i++) {
		for (var j = 1; j < cols - 1; j++) {
			var neighbours = (oldBoard[i - 1][j - 1] + oldBoard[i - 1][j] + oldBoard[i - 1][j + 1] + oldBoard[i][j - 1] + oldBoard[i][j + 1] + oldBoard[i + 1][j - 1] + oldBoard[i + 1][j] + oldBoard[i + 1][j + 1]);
			if (oldBoard[i][j] == 0 && neighbours == 3) {
				newBoard[i][j] = 1;
			}

			if (oldBoard[i][j] == 1 && neighbours != 3 && neighbours != 2) {
				newBoard[i][j] = 0;
			}
		}
	}

	for (var num = 0; num < cols; num ++) {
		newBoard[0][num] = 0;
		newBoard[rows - 1][num] = 0;
	}

	for (var num = 0; num < rows; num ++) {
		newBoard[num][0] = 0;
		newBoard[num][cols - 1] = 0;
	}



	return newBoard;
}

function play() {
	initialBoard = [];
	for (var i = 0; i < rows; i++) {
		initialBoard.push([]);
		for (var j = 0; j < cols; j++) {
			initialBoard[i].push(board[i][j]);
		}
	}

	if (lng == 'eng') {
		if (play == false) {
			playButton.innerHTML = 'Pause';
		}

		else {
			playButton.innerHTML = 'Play';
		}
	}

	if (lng == 'fra') {
		if (play == false) {
			playButton.innerHTML = 'Pause';
		}

		else {
			playButton.innerHTML = 'Jouer';
		}
	}

	play = !play;
	
	function drawNewGen() {
		if (play == true) {
			board = newGen(board);
			drawBoard(board);
			gen += 1
			genValue.innerHTML = gen;
		}
		
	}

	setInterval(drawNewGen, interval);
}

function playOneGen() {
	if (gen == 0) {
		initialBoard = [];
		for (var i = 0; i < rows; i++) {
			initialBoard.push([]);
			for (var j = 0; j < cols; j++) {
				initialBoard[i].push(board[i][j]);
			}
		}
	}
	

	play = false;
	playButton.innerHTML = 'Play';
	board = newGen(board);
	drawBoard(board);
	gen += 1
	genValue.innerHTML = gen;
}

createBoard(rows, cols);
drawBoard(board)