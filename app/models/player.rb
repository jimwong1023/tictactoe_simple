class Player < ActiveRecord::Base
  
  before_save { email.downcase! }

  has_many :game_players
  has_many :games, :through => :game_players

  validates :name, :email, presence: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }

end