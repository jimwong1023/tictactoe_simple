require 'spec_helper'

describe Game do
  it { should have_many :players }
  it { should have_many :game_players }
end