class CommentsController < ApplicationController
	before_action :set_comment, only: [:update, :destroy]

	def create
		@image = Image.find(params[:image_id])
		@comment = @image.comments.build(comment_params)
		@comment.image = @image
		@comment.user = current_user
		if @comment.save
			redirect_to image_path(@image, anchor: "comment_id_#{@comment.id}")
			flash[:success] = "Comment was added successfully"
		else
			render 'new'
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