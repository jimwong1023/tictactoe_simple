FactoryGirl.define do

  factory :player do
    id 1
    name Faker::Name.first_name
    email "TeSt@teSt.cOm"
  end
end