Rails.application.routes.draw do

  namespace :api do
    get 'games/index'
  end

  namespace :api do
    get 'games/show'
  end

  namespace :api do
    get 'player/lookup'
  end

  resources :tours
  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'

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

  get '/auth/google'
  get '/auth/:provider/callback', to: 'account#callback'

  post 'finds/lock/' => 'finds#lock', as: :lock
  delete 'finds/lock/:code' => 'finds#unlock', as: :unlock

  resources :finds do
    collection do
      post 'clear' => 'finds#clear', as: :clear
      get 'avatar/:plate_id' => 'finds#avatar', as: :avatar
    end

end
  post 'finds/:player_id' => 'finds#create'

  resources :game_players
  resources :players
  resources :games do
    member do
      get 'complete' => 'games#complete', as: :complete
      get 'results' => 'games#results', as: :results
      get 'players' => 'games#players', as: :game_players
      get 'plates' => 'games#plates', as: :game_plates
    end
  end
  resources :plates
  resources :game_types

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
