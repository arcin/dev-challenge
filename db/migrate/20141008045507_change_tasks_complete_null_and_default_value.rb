class ChangeTasksCompleteNullAndDefaultValue < ActiveRecord::Migration
  ### Update database defaults for complete and archived
  def change
    change_column_null :tasks, :complete, false
    change_column_default :tasks, :complete, false
  end
end
