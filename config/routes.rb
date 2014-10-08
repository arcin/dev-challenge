TasklistChallenge::Application.routes.draw do
  ### Add archive support
  resources :tasks, exclude: [:show] do
    member do
      put 'archive'
    end
  end
  root 'tasks#index'

  get 'readme' => 'docs#readme', as: :readme
  get 'maps' => 'maps#show', as: :maps
end
