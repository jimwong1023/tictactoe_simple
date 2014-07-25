$(document).ready(function() {
  var legalMoves = []
  var token = $('#token').text()
  var human = ""
  var computer = ""

  if (!confirm('Do you want to go first?')) {
    computer = token
    human = "O"
    computerMove(legalMoves, token)
  }

  else {
    human = token
    computer = "O"
    humanMove(token)
  }
});

function flip_token() {
  if ($('#token').text() == 'X') {
    $('#token').text('O'); 
  }
  else {
    $('#token').text('X');
  }
};

function temp_fill(square, token) {
  if (!(square.hasClass('filled'))) {
    square.text(token)
    square.addClass('temp_filled')
  }
};

function undo_temp_fill(square) {
  if (!(square.hasClass('filled'))) {
    square.text('')
    square.removeClass('temp_filled')
  }
};

function fill_square(square, token) {
  console.log(square)
  if (!(square.hasClass('filled'))) {
    square.removeClass('temp_filled')
    square.addClass('filled')
    square.text(token)
    flip_token()
    decide_outcome()
  }
};

function findLegalMoves(legalMoves) {
  var table = document.getElementById("board");
  for ( var i = 0, row; row = table.rows[i]; i++) {
    legalMoves[i] = []
    for (var j = 0, col; col = row.cells[j]; j++) {
      if ( col.innerHTML === "<p></p>" ) {
        legalMoves[i].push("")
      }
      else if ( col.innerHTML === "<p>X</p>" ) {
        legalMoves[i].push('X')
      }
      else if ( col.innerHTML === "<p>O</p>") {
        legalMoves[i].push('O')
      }
    }
  }
};

function computerMove(legalMoves, token) {
  findLegalMoves(legalMoves)
    $.ajax({
      url: '/move',
      type: 'get',
      data: { "board": legalMoves, "computer_token": $('#token').text() }
    }).done( function(result) { 
      fill_square($('#' + result[0]).find('p'), token)
      token = $('#token').text()
    })
}

function humanMove(token) {
  $('.square').mouseover(function() {
    temp_fill($(this).find('p'), token)
  })

  $('.square').mouseout(function() {
    undo_temp_fill($(this).find('p'))
  })

  $('.square').click(function() {
    fill_square($(this).find('p'))
    token = $('#token').text()
  })
}

function decide_outcome() {
  if (horizontal_victory() || vertical_victory() || diagonal_victory()) {
    if ($('#token').text() == 'X')
      var winner = 'X'
    else
      var winner = 'O'
    console.log(winner)
  }
  else if (no_unfilled_squares()) {
    console.log("DRAW")
  }
}

function three_item_equality(x, y, z) {
  if ((x === z && y === z) && (x != '') && (y != '') && (z != ''))
    return true
  else
    return false
}

function horizontal_victory() {
  if (three_item_equality($('#top-left').text(), $('#top-mid').text(), $('#top-right').text()) || three_item_equality($('#mid-left').text(), $('#mid-mid').text(), $('#mid-right').text()) || three_item_equality($('#bottom-left').text(), $('#bottom-mid').text(), $('#bottom-right').text()))
    return true
  else
    return false
}

function vertical_victory() {
  if (three_item_equality($('#top-left').text(), $('#mid-left').text(), $('#bottom-left').text()) || three_item_equality($('#top-mid').text(), $('#mid-mid').text(), $('#bottom-mid').text()) || three_item_equality($('#top-right').text(), $('#mid-right').text(), $('#bottom-right').text()))
    return true
  else
    return false
}

function diagonal_victory() {
  if (three_item_equality($('#top-left').text(), $('#mid-mid').text(), $('#bottom-right').text()) || three_item_equality($('#top-right').text(), $('#mid-mid').text(), $('#bottom-left').text()))
    return true
  else
    return false
}

function no_unfilled_squares() {
  if ($('.filled').length == 9)
    return true
  else
    return false
}

function mark_all_filled() {
  $('.square p').addClass('filled')
}

