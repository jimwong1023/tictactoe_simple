$(document).ready(function() {
  var legalMoves = []
  var token = $('#token').text()

  $('.square').mouseover(function() {
    temp_fill($(this).find('p'), token)
  })

  $('.square').mouseout(function() {
    undo_temp_fill($(this).find('p'))
  })

  $('.square').click(function() {
    fill_square($(this).find('p'))
    token = $('#token').text()
    computerMove(legalMoves)
  })
});

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
  if (!(square.hasClass('filled'))) {
    square.removeClass('temp_filled')
    square.addClass('filled')
    square.text(token)
    decide_outcome()
  }
};

function findLegalMoves(legalMoves) {
  $('#board tr').each(function(i) {
      legalMoves[i] = []
    $(this).find('td').each(function() {
      legalMoves[i].push($(this).find('p').text())
    })
  })
};

function computerMove(legalMoves) {
  findLegalMoves(legalMoves)
    $.ajax({
      url: '/move',
      type: 'get',
      data: { "board": legalMoves }
    }).done( function(result) { 
      console.log("SUCCESS")
      fill_square($('#' + result[0]).find('p'), result[1])
    })
}

function humanMove(token) {
  
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

