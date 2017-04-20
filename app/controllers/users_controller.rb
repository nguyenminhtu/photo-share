class UsersController < ApplicationController

	def my_profile
		@user = current_user
		@images = @user.images
	end

	def my_friends
		@friends = current_user.friends
	end

	def search
		@users = User.search(params[:search_param])

		if @users
			@users = current_user.except_current_user(@users)
			render partial: "common/lookup"
		else
			render status: :not_found, nothing: true
		end
	end

	def show
		@user = User.find(params[:id])
		@images = @user.images
	end

	def add_friend
		@friend = User.find(params[:friend])
		current_user.friendships.build(friend_id: @friend.id)

		if current_user.save
			redirect_to my_friends_path, notice: "You are now followed your friend"
		else
			redirect_to my_friends_path
			flash[:error] = "There was an error with adding user as your friend. Sorry for in convenience !"
		end
	end

end