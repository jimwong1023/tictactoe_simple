class PlayersController < ApplicationController
  def new
  end

  def create
    @player = Player.new(player_params)
    if @player.save
      sign_in @player
      redirect_to root_url
    else
      render 'new'
    end
  end

  private

    def player_params
      params.require(:player).permit(:name, :email)
    end
end