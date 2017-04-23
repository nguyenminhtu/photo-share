class UsersController < ApplicationController

	def my_profile
		@user = current_user
		@count = @user.images.order("created_at DESC").count
		if @count > 9
			@images = @user.images.order("created_at DESC").limit(9)
		else
			@images = @user.images.order("created_at DESC").limit(@count)
		end
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
			respond_to do |format|
				format.html { redirect_to my_friends_path, notice: "You have follow successfully !" }
				format.js
			end
		end
	end


	def more_image
		if params[:id]
			if params[:id].to_i > Image.first.id
				@images = Image.where(user_id: current_user.id).where("id < ?", params[:id]).limit(3).order("created_at DESC")
			end
		end

		respond_to do |format|
			format.js
		end
	end

end