class Task < ActiveRecord::Base
  ### Add multiuser support
  belongs_to :user

  {
    complete: { completed: true, incomplete: false },
    archived: { archived: true, unarchived: false }
  }.each do |attribute, scopes|
    scopes.each do |scpe, value|
      scope scpe, lambda { where(attribute => value) }
    end

    define_method "#{attribute}!" do
      update_attribute(attribute, true)
    end

    ### Add complete support
    define_method "#{attribute}?" do
      send(attribute)
    end
  end
end
