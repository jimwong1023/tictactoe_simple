class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.string :email

      t.timestamps
    end
    add_index :players, [:email],  unique: true
  end
end
