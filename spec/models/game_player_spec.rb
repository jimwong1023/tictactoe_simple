require 'spec_helper'

describe GamePlayer do
  it { should belong_to :player }
  it { should belong_to :game }
end