class Game < ActiveRecord::Base
  has_many :game_players
  has_many :players, :through => :game_players

  validate :has_exactly_two_players

  def has_exactly_two_players
    unless self.players.count == 2
      errors.add(:game, "Must have only 2 players")
    end
  end

end