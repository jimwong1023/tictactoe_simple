module ComputerHelper
  POSITIONS = [['top-left','top-mid','top-right'],
               ['mid-left','mid-mid','mid-right'],
               ['bottom-left','bottom-mid','bottom-right']]

  def computer_move(board)
    move = ""

    while move == ""
      rand_row = rand(3)
      rand_col = rand(3)

      if board[rand_row][rand_col] == ""
        move = POSITIONS[rand_row][rand_col]
      end
    end
    move
  end

  def format_board(board_hash)
    board = []
    board_hash.each do |key, array|
      board << array
    end
    board
  end

end