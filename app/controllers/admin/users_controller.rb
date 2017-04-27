class Admin::UsersController < AdminController

	def index
		@users = User.order("created_at DESC").paginate(:page => params[:page], per_page: 10)
	end

	def destroy
		@user = User.find(params[:id])
		respond_to do |format|
			if @user
				@user.destroy
				format.js
			else
				redirect_to admin_users_path
				flash[:error] = "User does not exist on our database"
			end
		end
	end

end