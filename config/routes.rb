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
  get 'more-comment', to: 'images#more_comment'
  get 'more-image', to: 'users#more_image'
  resources :users, only: [:show]
  resources :friendships, only: [:destroy]

  root 'images#index'
end
