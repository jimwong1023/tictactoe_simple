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
    self.fillSquare($(this).find('p'));
    self.board.updateBoardState(playBoard);
    self.computerMove();
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

Game.prototype.fillSquare = function (square, token) {
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

    self.decideOutcome();
  }
}

Game.prototype.computerMove = function () {
  var POSITIONS = [['top-left','top-mid','top-right'],
               ['mid-left','mid-mid','mid-right'],
               ['bottom-left','bottom-mid','bottom-right']];

  var move = "";

  while ( move === "") {
    var randRow = Math.round(Math.random()*2);
    var randCol = Math.round(Math.random()*2);
    if ( this.board.state[randRow][randCol] === "") {
      move = POSITIONS[randRow][randCol];
    }
  }
  this.fillSquare($('#' + move).find('p'), 'O');
  this.decideOutcome();
}

Game.prototype.decideOutcome = function () {

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
}

Board.prototype.updateBoardState = function (playBoard) {
  var self = this;
  playBoard.find('tr').each(function (i) {
    self.state[i] = []
    $(this).find('td').each(function(){
      self.state[i].push($(this).find('p').text())
    })
  })
}

Board.prototype.isThereWinner = function () {
  
}

$(document).ready(function () {
  var playBoard = $("#board")
 

  var game = new Game(playBoard);
});

// var board = [];
// $(document).ready(function() {
  

//   $('.square').mouseover(function() {
    // var xcord = $(this).attr('xcord');
    // var ycord = $(this).attr('ycord');
    // xcord = +xcord;
    // ycord = +ycord;
//     temp_fill($(this).find('p'), 'X')
//   })

//   $('.square').mouseout(function() {
//     undo_temp_fill($(this).find('p'))
//   })

//   $('.square').click(function() {
//     fill_square($(this).find('p'))
//     computerMove()
//   })
// });

// function temp_fill(square, token) {
//   if (!(square.hasClass('filled'))) {
//     square.text(token)
//     square.addClass('temp_filled')
//   }
// };

// function undo_temp_fill(square) {
//   if (!(square.hasClass('filled'))) {
//     square.text('')
//     square.removeClass('temp_filled')
//   }
// };

// function fill_square(square, token) {
//   if (!(square.hasClass('filled'))) {
//     square.removeClass('temp_filled')
//     square.addClass('filled')
//     square.text(token)
//     decide_outcome(board)
//   }
// };

// function updateBoardState() {
//   $('#board tr').each(function(i) {
//       board[i] = []
//     $(this).find('td').each(function() {
//       board[i].push($(this).find('p').text())
//     })
//   })
// };

// function computerMove() {
//   updateBoardState()
//   $.ajax({
//     url: '/move',
//     type: 'get',
//     data: { "board": board}
//   }).done( function(result) { 
//     console.log("SUCCESS");
//     fill_square($('#' + result[0]).find('p'), result[1])
//   })
// };

// function decide_outcome(board) {
//   // updateBoardState(board)
//   // $.ajax({
//   //   url: '/outcome',
//   //   type: 'get',
//   //   data: { "board": board }
//   // }).done( function(result) {
//   //   console.log("OUTCOME");
//   // })
// };

// function three_item_equality(x, y, z) {
//   if ((x === z && y === z) && (x != '') && (y != '') && (z != ''))
//     return true
//   else
//     return false
// }

// function horizontal_victory() {
//   if (three_item_equality($('#top-left').text(), $('#top-mid').text(), $('#top-right').text()) || three_item_equality($('#mid-left').text(), $('#mid-mid').text(), $('#mid-right').text()) || three_item_equality($('#bottom-left').text(), $('#bottom-mid').text(), $('#bottom-right').text()))
//     return true
//   else
//     return false
// }

// function vertical_victory() {
//   if (three_item_equality($('#top-left').text(), $('#mid-left').text(), $('#bottom-left').text()) || three_item_equality($('#top-mid').text(), $('#mid-mid').text(), $('#bottom-mid').text()) || three_item_equality($('#top-right').text(), $('#mid-right').text(), $('#bottom-right').text()))
//     return true
//   else
//     return false
// }

// function diagonal_victory() {
//   if (three_item_equality($('#top-left').text(), $('#mid-mid').text(), $('#bottom-right').text()) || three_item_equality($('#top-right').text(), $('#mid-mid').text(), $('#bottom-left').text()))
//     return true
//   else
//     return false
// }

// function no_unfilled_squares() {
//   if ($('.filled').length == 9)
//     return true
//   else
//     return false
// }

// function mark_all_filled() {
//   $('.square p').addClass('filled')
// }

