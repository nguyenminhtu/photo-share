class Admin::CommentsController < AdminController

	def index
		@comments = Comment.order("created_at DESC").paginate(:page => params[:page], per_page: 10)
	end

	def destroy
		@comment = Comment.find(params[:id])
		respond_to do |format|
			if @comment
				@comment.destroy
				format.js
			else
				redirect_to admin_comments_path
				flash[:error] = "Comment does not exist on our database"
			end
		end
	end

end