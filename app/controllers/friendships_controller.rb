class FriendshipsController < ApplicationController

	def destroy
		@friendship = current_user.friendships.where(friend_id: params[:id]).first
		@friendship.destroy
		
		respond_to do |format|
			format.js
		end
	end

end