require 'spec_helper'

describe Player do
  it { should validate_presence_of :name }
  it { should validate_presence_of :email }
  it { should validate_uniqueness_of :email }
  it { should have_many :game_players }
  it { should have_many :games }

  let(:player) { FactoryGirl.create(:player) }

  context "uppercase email" do
    it "should save as downcased" do
      player.email = "Test@test.com"
      player.save
      expect(player.email).to eq "test@test.com"
    end
  end
end