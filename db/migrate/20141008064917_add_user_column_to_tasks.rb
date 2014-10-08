class AddUserColumnToTasks < ActiveRecord::Migration
  ### Add multiuser support
  def change
    add_reference :tasks, :user, index: true
  end
end
