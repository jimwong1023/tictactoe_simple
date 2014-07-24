class CreateGamePlayers < ActiveRecord::Migration
  def change
    create_table :game_players do |t|
      t.belongs_to :game
      t.belongs_to :player
    end
  end
end
