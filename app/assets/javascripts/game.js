function Game (playBoard) {
    this.board = new Board();
    this.board.updateBoardState(playBoard);
    this.bindEvents(playBoard);
}

Game.prototype.bindEvents = function (playBoard) {
  var self = this;
  $('.square').mouseover(function() {
    self.tempFill($(this).find('p'));
  });

  $('.square').mouseout(function() {
    self.undoTempFill($(this).find('p'));
  });

  $('.square').click(function() {
    self.fillSquare($(this).find('p'), playBoard);
    self.fillSquare($('#' + self.computerMove(playBoard)).find('p'), playBoard, 'O');
  });
}

Game.prototype.tempFill = function (square) {
  if (!square.hasClass('filled')) {
    square.text('X');
    square.addClass('temp_filled');
  }
}

Game.prototype.undoTempFill = function (square) {
  if (!square.hasClass('filled')) {
    square.text("");
    square.removeClass('temp_filled');
  }
}

Game.prototype.fillSquare = function (square, playBoard, token) {
  var self = this;
  if (!square.hasClass('filled')) {
    square.removeClass('temp_filled');
    square.addClass('filled');

    if (token != undefined) {
      square.text('O');
    }
    else {
      square.text('X');
    }
    self.board.updateBoardState(playBoard);
    self.decideOutcome(playBoard);
  }
}

Game.prototype.computerMove = function (playBoard) {
  var POSITIONS = [['top-left','top-mid','top-right'],
               ['mid-left','mid-mid','mid-right'],
               ['bottom-left','bottom-mid','bottom-right']];

  var move = "";

  for ( var i = 0; i < this.board.state.length; i++ ) {
    for ( var j = 0; j < this.board.state[i].length; j++ ) {
      if ( this.board.state[i][j] === "" ) {
        this.board.state[i][j] = "O";
        if ( this.board.isThereWinner() === "O" ) {
          this.board.state[i][j] = "";
          move = POSITIONS[i][j];
          console.log("SELF MOVE" + move);
          return move;
        }
        this.board.state[i][j] = "";
      }
    }
  }

  for ( var i = 0; i < this.board.state.length; i++ ) {
    for ( var j = 0; j < this.board.state[i].length; j++ ) {
      if ( this.board.state[i][j] === "" ) {
        this.board.state[i][j] = "X";
        if ( this.board.isThereWinner() === "X" ) {
          this.board.state[i][j] = "";
          move = POSITIONS[i][j];
          console.log("HUMAN MOVE" + move);
          return move;
        }
        this.board.state[i][j] = "";
      }
    }
  }

  while ( move === "") {
    var randRow = Math.round(Math.random()*2);
    var randCol = Math.round(Math.random()*2);
    if ( this.board.state[randRow][randCol] === "") {
      move = POSITIONS[randRow][randCol];
    }
  }
  return move
}

Game.prototype.decideOutcome = function (playBoard) {
  var winner = this.board.isThereWinner();
  if ( winner === "X" || winner === "O" ) {
    alert(winner + " is the winner! The game will now restart.");
    this.restart(playBoard);
  }
  else if ( winner === "TIE" ) {
    alert("Tie Game! The game will now restart.");
    this.restart(playBoard);
  }
}

Game.prototype.restart = function (playBoard) {
  $(".square").each(function (i) {
    var square = $(this).find('p')
    if ( square.hasClass("filled") ) {
      square.removeClass("filled").text("");
    }
  });
  this.board.updateBoardState(playBoard);
}

/*
  Computer AI progression
  1. First available spot
  2. Find a random spot to put in
  3. Prevent the player from winning
  4. Try to win myself
*/


function Board () {
  this.state = [];
  this.winConditions = [ [[0,0],[0,1],[0,2]],
                         [[1,0],[1,1],[1,2]],
                         [[2,0],[2,1],[2,2]],
                         [[0,0],[1,0],[2,0]],
                         [[0,1],[1,1],[2,1]],
                         [[0,2],[1,2],[2,2]],
                         [[0,0],[1,1],[2,2]],
                         [[0,2],[1,1],[2,0]] ]
}

Board.prototype.updateBoardState = function (playBoard) {
  var self = this;
  playBoard.find('tr').each(function (i) {
    self.state[i] = []
    $(this).find('td').each(function(){
      self.state[i].push($(this).find('p').text())
    });
  });
}

Board.prototype.isThereWinner = function () {
  var checkTie = [];
  for ( var i = 0; i < this.winConditions.length; i++ ) {
    var checkArray = [];
    for ( var j = 0; j < this.winConditions[i].length; j++ ) {
      checkArray.push(this.state[this.winConditions[i][j][0]][this.winConditions[i][j][1]]);
      checkTie.push(this.state[this.winConditions[i][j][0]][this.winConditions[i][j][1]]);
    }
    if ( checkArray[0] === checkArray[1] && checkArray[1] === checkArray[2] && checkArray[0] != "" ) {
      return checkArray[0];
    }
    checkArray = [];
  }
  if ( checkTie.indexOf("") === -1 ) {
    return "TIE";
  }
  else {
    return null;
  }
}

$(document).ready(function () {
  var playBoard = $("#board")
 

  var game = new Game(playBoard);
});