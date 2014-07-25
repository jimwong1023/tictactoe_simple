class GamesController < ApplicationController

  def move
    board = format_board(params[:board])
    move = computer_move(params[:computer_token], board)
    data = [move]
    render json: data
  end

end