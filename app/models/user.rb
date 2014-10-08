class User < ActiveRecord::Base
  ### Add multiuser support
  has_many :tasks
end
