class Admin::WelcomeController < AdminController

	def index
		@image = Image.all.count
		@user = User.all.count
		@comment = Comment.all.count
	end

end