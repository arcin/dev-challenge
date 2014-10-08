module TasksHelper
  ### Style completed tasks
  def complete_class(task)
    task.complete? ? 'complete' : ''
  end
end
