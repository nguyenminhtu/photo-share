Rails.application.routes.draw do
  devise_for :users, :controllers => { :registrations => "registrations" }

  resources :images do
    resources :comments
    member do
      put 'like', to: 'images#upvote'
      put 'dislike', to: 'images#downvote'
  	end
  end

  get 'my-profile', to: 'users#my_profile'
  get 'my-friends', to: 'users#my_friends'
  get 'search_user', to: 'users#search'
  post 'add_friend', to: 'users#add_friend'
  get 'load_more', to: 'images#load_more'
  resources :users, only: [:show]
  resources :friendships, only: [:destroy]

  root 'images#index'
end
