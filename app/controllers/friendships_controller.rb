class FriendshipsController < ApplicationController

	def destroy
		@friendship = current_user.friendships.where(friend_id: params[:id]).first
		@friendship.destroy
		redirect_to my_friends_path
		flash[:danger] = "You have unfollowed successfully"
	end

end