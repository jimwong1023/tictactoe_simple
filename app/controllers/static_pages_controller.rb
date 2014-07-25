class StaticPagesController < ApplicationController

  def home
    @player = Player.new
  end

end