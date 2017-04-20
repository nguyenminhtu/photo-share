class CommentsController < ApplicationController

	def create
		@image = Image.find(params[:image_id])
		@comment = @image.comments.build(comment_params)
		@comment.image = @image
		@comment.user = current_user
		if @comment.save
			redirect_to image_path(@image, anchor: "#{@comment.id}")
			flash[:success] = "Comment was added successfully"
		else
			render 'new'
		end
	end


	private
		def comment_params
			params.require(:comment).permit(:content, :user_id, :image_id)
		end

end