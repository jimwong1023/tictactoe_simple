class GamesController < ApplicationController

  def move
    board = format_board(params[:board])
    move = computer_move(board)
    data = [move, "O"]
    render json: data
  end

  def outcome
    board = format_board(params[:board])
    binding.pry
    data = []
    render json: data
  end

end