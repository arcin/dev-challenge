class ChangeTasksArchivedNullAndDefaultValue < ActiveRecord::Migration
  ### Update database defaults for complete and archived
  def change
    change_column_null :tasks, :archived, false
    change_column_default :tasks, :archived, false
  end
end
