class CommentsController < ApplicationController
	before_action :set_comment, only: [:update, :destroy]

	def create
		@image = Image.find(params[:image_id])
		@comment = @image.comments.new
		@comment.content = params[:content]
		@comment.image = @image
		@comment.user = current_user
		respond_to do |format|
			if @comment.save
				@all_comment = Image.find(params[:image_id]).comments.count
				format.js
			else
				format.js
				flash[:error] = "An error has occured when post comment. Sorry for this inconvenience !"
			end
		end
	end

	def update
		@comment.content = params[:content]
		if @comment.save
			respond_to do |format|
				format.js
			end
		end
	end

	def destroy
		@comment.destroy
		@all_comment = Image.find(params[:image_id]).comments.count
		respond_to do |format|
			format.js
		end
	end


	private
		def comment_params
			params.require(:comment).permit(:content, :user_id, :image_id)
		end

		def set_comment
			@comment = Comment.find(params[:id])
		end

end