Rails.application.routes.draw do

  resources :tours
  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
  get '/.well-known/acme-challenge/:id' => 'application#letsencrypt'
  get 'play/map' => 'play#map', as: :map
  get 'play/table' => 'play#table', as: :current_table
  get 'play/timeline' => 'play#timeline', as: :timeline
  get '/play/:id' => 'play#set', as: :play_game
  get '/play' => 'play#index', as: :current_game
  get '/dashboard' => 'administrator#index', as: :dashboard

  root 'welcome#index'
  get '/map/' => 'welcome#map'
  get 'about' => 'welcome#about'
  get 'invite' => 'invite#index', as: :invites
  post 'invite' => 'invite#create', as: :send_invite
  get 'invite/:token' => 'invite#accept', as: :accept_invite
  post 'invite/join' => 'invite#accept', as: :join_game

  get 'login' => 'account#index', as: :login
  get 'logout' => 'account#logout', as: :logout
  get '/auth/failure' => 'account#failure'

  get '/auth/google'
  get '/auth/:provider/callback', to: 'account#callback'

  post 'spoils/lock/' => 'spoils#lock', as: :lock
  delete 'spoils/lock/:code' => 'spoils#unlock', as: :unlock

  resources :spoils do
    collection do
      post 'clear' => 'spoils#clear', as: :clear
      get 'avatar/:plate_id' => 'spoils#avatar', as: :avatar
    end

end
  post 'spoils/:player_id' => 'spoils#create'

  resources :game_players
  get 'game_players/:game_id/count' => 'game_players#count'

  resources :players
  resources :games do
    member do
      get 'complete' => 'games#complete', as: :complete
      get 'results' => 'games#results', as: :results
    end
  end
  resources :plates
  resources :game_types
end
