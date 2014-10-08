class CreateUsers < ActiveRecord::Migration
  ### Add multiuser support
  def change
    create_table :users do |t|
      t.string :name
      t.string :password

      t.timestamps
    end
  end
end
